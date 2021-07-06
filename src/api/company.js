import request from '@/utils/request'

// 获取公司信息
export function getCompanyInfo(companyId) {
  return request.get(`/company/${companyId}`)
}
