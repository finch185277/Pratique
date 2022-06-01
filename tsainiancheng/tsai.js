var result;
var metadata_name = ['title', 'author', 'book_code', 'compilation_name', 'compilation_order', 'compilation_vol', 'doc_attachment', 'doc_attachment_caption', 'doc_category_l1', 
	'doc_category_l2', 'doc_category_l3', 'doc_seq_number', 'doc_source', 'doc_topic_l1', 'doc_topic_l2', 'doc_topic_l3', 'docclass', 'docclass_aux', 'doctype', 'doctype_aux', 
	'geo_level1', 'geo_level2', 'geo_level3', 'geo_longitude', 'geo_latitude', 'time_orig_str', 'time_varchar', 'time_norm_year', 'era', 'time_norm_kmark', 'year_for_grouping',
	'time_dynasty', 'timeseq_not_before', 'timeseq_not_after'];
const default_mapping = {'id': 'filename', '來源系統': 'doc_source', '來源系統縮寫': 'metadata/doc_source', '文件原系統頁面URL': 'metadata/doc_source_href',
	'題名': 'title', '摘要': 'doc_content', '類目階層': 'metadata/category', '西元年': 'year_for_grouping', '起始時間': 'timeseq_not_before', '結束時間': 'timeseq_not_after',
	'典藏號': 'metadata/collection_number',
	'相關人員': 'metatags/PersonName', '相關地點': 'metatags/PlaceName', '相關組織': 'metatags/Organization', '關鍵詞': 'metatags/Keywords'}; // [original]另外處理
const default_config = {
	'db_name': 'default',
	'corpus': 'Mycorpus',
	'mapping': default_mapping,
};
var filename_col, doc_content_col;
var metadata_cols, metatags_cols;
var col_arr;

function Vic(query, config={}) {
	config = Object.assign({}, default_config, config);
	var data = myajax(query, config);
	return processing(data, config);
}

function myajax(query, config) {
	var ret, DocuXML;
	$.ajax({
		method: "POST",
		url: "select.php",
		async: false,
		success: function(data) {
			ret = data;
		},
		error: function(response) {
			ret = response;
		}
	});
	return ret;
}

function processing(data, config) {
	metatags_en = 0;
	filename_col = '';
	doc_content_col = '';
	metadata_cols = [];
	metatags_cols = [];
	metatags_dict = {};
	console.log(data);
	col_arr = Object.keys(data[0]);

	build_metadata_cols(data, config);
	var corpusSetting = buildCorpusSetting(config);
	var good = dataFed2DocuXML(data, config);
	var tmp = {'metadata': corpusSetting[0], 'tag': corpusSetting[1]};
	corpusSetting = {};
	corpusSetting[config['corpus']] = tmp;
	console.log(good);
	console.log(corpusSetting);
	convertToXMLtsai(good, corpusSetting);
	
	var obj1 = {name: "dbTitleForImport", value: config['db_name']};
	var obj2 = {value: result, name: "importedFiles[]", filename: "test.xml"};
	var DocuXML = [];
	DocuXML[0] = obj1;
	DocuXML["file"] = obj2;

	docuskyManageDbListSimpleUI.login($("#DocuSkyUsername").val(), $("#DocuSkyPassword").val(),
		function() {docuskyManageDbListSimpleUI.uploadMultipart(DocuXML, function() {console.log("success");}, function() {console.log("failed");});},
		function() {console.log("login failed");}
	);
	return DocuXML;
}

function build_metadata_cols(json, config) {
	/*console.log(col_arr);
	for (i=0; i<json.length; i++) {
		Object.keys(json[i]).forEach(key => metadata_cols.add(key));
	}
	metadata_cols = Array.from(metadata_cols);
	metadata_cols = metadata_name.filter(value => metadata_cols.includes(value));*/

	var doc_source_set = new Set(), original_set = new Set();
	var mapping = config['mapping'], doc_source_col = '';
	for (col of col_arr)
		if (mapping[col] == 'doc_source')
			doc_source_col = col;
	for (col of col_arr)
		if (col == '爬蟲Original')
			for (i = 0; i<json.length; i++) {
				if (!doc_source_set.has(json[i][doc_source_col]))
					for (const [key, value] of Object.entries(JSON.parse(json[i]['爬蟲Original'])))
						original_set.add(key);
				doc_source_set.add(json[i][doc_source_col]);
			}
		else if (mapping[col] == undefined)
			;
		else if (mapping[col].indexOf("metadata/")==0 || mapping[col].indexOf("metatags/")==0)
			metatags_cols.push(col);
		else if (mapping[col] == 'filename')
			filename_col = col;
		else if (mapping[col] == 'doc_content')
			doc_content_col = col;
		else if (mapping[col] != 'corpus')
			metadata_cols.push(col);
	metatags_cols = metatags_cols.concat(Array.from(original_set));
	return 0;
}

function buildCorpusSetting(config) {
	var metadata = [], metatags = [];
	metadata_cols.forEach(key => metadata.push({'name': config["mapping"][key], 'value': key, 'order': undefined}));
	metatags_cols.forEach(key => metatags.push({'name': "Udef_"+(key), 'title': key}));
	return [metadata, metatags]
}

function dataFed2DocuXML(json, config) {
	var good = [];
	for (i = 0; i<json.length; i++) {
		var element = {'comments': [], 'content': json[i][doc_content_col], 'corpus': config['corpus'], 'events': [], 'filename': json[i][filename_col],
		'metadata': buildMetaDataList(json[i], config),	'metatags': buildMetaTagList(json[i], config), 'otherdata': [], 'udefmetadata': []};
		good.push(element);
	}
	var keys = Object.keys(json[0]);
	return good;
}

function buildMetaDataList(metadata_obj, config) {
	var metadata_list = [];
	var mapping = config["mapping"];
	var keys = Object.keys(metadata_obj);
	for (col of metadata_cols)
		if (keys.indexOf(col) >= 0)
			metadata_list.push({'name': mapping[col], 'zhname': col, 'value': metadata_obj[col]});
		else
			metadata_list.push({'name': mapping[col], 'zhname': col, 'value': '-'});
	return metadata_list;
}

function buildMetaTagList(metatags_obj, config) {
	var metatags_list = [];
	var mapping = config["mapping"];
	for (const [key, value] of Object.entries(metatags_obj))
		if (key == '爬蟲Original' && metatags_obj[key] != '')
			for (const [key_ori, value] of Object.entries(JSON.parse(metatags_obj[key])))
				value.toString().split(';').forEach(v => metatags_list.push({'name': "Udef_"+(key_ori), 'value': v, 'freq': undefined}));
		else if (mapping[key] != undefined && (mapping[key].indexOf('metadata/') == 0 || mapping[key].indexOf('metatags/') == 0))
			value.split(';').forEach(v => metatags_list.push({'name': "Udef_"+(key), 'value': v, 'freq': undefined}));
	return metatags_list;
}

// [original] 的metatags編碼
function toHex(str) {
	var result = '';
	for (var i=0; i<str.length; i++) {
		result += str.charCodeAt(i).toString(16);
	}
	return result;
}

function readxlsx(inpdata, fmt) {
		function to_json(workbook) {
			var json_raw;
			
			workbook.SheetNames.forEach(function (sheetName) {
				var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				var range = workbook.Sheets[sheetName]['!ref'].split(':')[1][0];
				for (var i = 65; i <= range.charCodeAt(0); i++) // 權移之記
					col_arr.push(workbook.Sheets[sheetName][String.fromCharCode(i)+'1'].v);
				if (roa.length > 0) {
					json_raw = roa;
				}
			});
			
			for (i=0; i<json_raw.length; i++) {
				var keys = Object.keys(json_raw[i]);
				const index = keys.indexOf('爬蟲Original');
				if (index > -1)
					keys.splice(index, 1);
				keys.forEach(key => json_raw[i][key] = json_raw[i][key].replaceAll('&', '&amp;').replaceAll('\"', '&quot;'));
			}
			
			return json_raw;
		}

		var workbook = XLSX.read(inpdata, { type: 'binary' });


		if (fmt === 'json') {
			return to_json(workbook);
		}
}

function convertToXMLtsai(_documents, _corpusSetting) {
	var xmlFormer = new DocuxmlFormer();
	var xml_docs = '', xml_corpus = '';

	// each document
	_documents.forEach((docObj, i) => {
		xml_docs += xmlFormer.formDoc(docObj);

		// send progress
	});

	// each corpus
	for (let name in _corpusSetting) {
		xml_corpus += xmlFormer.formCorpusMeta(name, _corpusSetting[name]);
	}
	
	result = '<?xml version="1.0"?>\n' + 
			xmlFormer.generateXML({
				name: 'ThdlPrototypeExport',
				br: true,

				value: xml_corpus + xmlFormer.generateXML({
						name: 'documents',
						br: true,
						value: xml_docs
					})
			});
}
