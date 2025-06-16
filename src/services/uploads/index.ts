import axios from 'axios';

class Service {
  uploadFile({ data }: { data?: FormData }) {
    return axios.post('/api/s3-upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

const UploadService = new Service();
export default UploadService;
