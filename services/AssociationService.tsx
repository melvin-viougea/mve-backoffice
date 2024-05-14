import Axios from "./AxiosService";

const baseUrl = '/api/association';

const getAll = () => {
    return Axios.get(`${baseUrl}`);
};

const get = (id: getDataProps) => {
    return Axios.get(`${baseUrl}/${id}`);
};

const create = (data: createDataProps) => {
    return Axios.post(`${baseUrl}`, data);
};

const updateAll = ({ id, data}: updateDataProps) => {
    return Axios.put(`${baseUrl}/${id}`, data);
};

const update = ({ id, data }: updateDataProps) => {
    return Axios.patch(`${baseUrl}/${id}`, data);
};

const remove = (id: deleteDataProps) => {
    return Axios.delete(`${baseUrl}/${id}`);
};

const AssociationService = {
    getAll,
    get,
    create,
    updateAll,
    update,
    remove
};

export default AssociationService;