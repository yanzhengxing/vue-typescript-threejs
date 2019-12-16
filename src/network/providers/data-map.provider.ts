import { BaseProvider } from "./base.provider";
import { DataServer } from "../servers/data.server";
import { DataTypeAndTargetParams } from "../../models";
/**
 * @description 数据可视化
 * @author 闫正兴
 * @date 2019-12-04
 * @class DataMapProvide
 * @extends {BaseProvider}
 */
class DataMapProvide extends BaseProvider {
  /** 服务器接口服务 */
  http = new DataServer();

  /** 获取全国所有的省份 */
  async getProvinceList() {
    // tslint:disable-next-line: completed-docs
    const result = await this.http.get<{data: any}>(`/data_collect_tile/proxy/space`);
    const data = result.data.result;
    return data;
  }
  /** 获取所有行业 */
  async getDataType(params: DataTypeAndTargetParams) {
    // tslint:disable-next-line: completed-docs
    const result = await this.http.get<{data: any}>(`/data_collect_tile/proxy/domain`, { params });
    const data = result.data.result;
    return data;
  }
  /** 获取指标 */
  async getDataTarget(params: DataTypeAndTargetParams) {
    // tslint:disable-next-line: completed-docs
    const result = await this.http.get<{data: any}>(`/data_collect_tile/proxy/metrics`, { params });
    const data = result.data.result;
    return data;
  }
}

export default new DataMapProvide();
