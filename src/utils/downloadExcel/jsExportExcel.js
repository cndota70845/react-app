import ExportJsonExcel from 'js-export-excel';
function jsExportExcel (opt) {
    var option={};
    const data = opt.data;
    if (data && data instanceof Array && data.length > 0) {
        const columns = opt.columns.filter(item => !item.render).map(item => {
            return item.title;
        });
        const dataTable = data.map(item => {
            let obj = {};
            for (let key in item) {
                let key_str = opt.columns.filter(item => item.key === key || item.dataIndex === key);
                if (key_str.length === 1 && key_str[0].title) {
                    obj[key_str[0].title] = item[key];
                }
            }
            return obj;
        });
        option.fileName = opt.fileName;
        option.datas=[
            {
                sheetData:dataTable,
                sheetName:'sheet1',
                sheetFilter:columns,
                sheetHeader:columns,
                columnWidths: opt.columnsWidth
            }
        ];
        var toExcel = new ExportJsonExcel(option); 
        toExcel.saveExcel(); 
    }
}

export default jsExportExcel;
