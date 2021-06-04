import axios from '../../http.js'; // 导入http中创建的axios实例

const filed = {
    //表格列表Get
    listGet () {        
        return axios.get(`/menu/manage/common/`);   
    }
} 
export default filed;