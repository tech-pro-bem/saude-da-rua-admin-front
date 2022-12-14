import axiosInstance from '../axiosInstance';
import makeBase64 from '../../utils/base64';

async function fetchReports() {
  const params = { limit: 100 };
  const { data } = await axiosInstance.get('/file/PDF', { params });
  return data;
}

async function uploadReport(report) {
  const base64Report = await makeBase64(report);
  const base64ReportValue = base64Report.replace('data:application/pdf;base64,', '');
  const response = await axiosInstance.post('/file/PDF', {
    name: report.name,
    file: {
      mime: 'application/pdf',
      data: base64ReportValue,
    },
  });

  return response;
}

async function uploadReports(reports) {
  const results = await Promise.all(reports.map(uploadReport));
  return results;
}

async function deleteReport(reportId) {
  const response = await axiosInstance.delete(`/file/${reportId}`);
  return response;
}

export {
  fetchReports, uploadReport, uploadReports, deleteReport,
};
