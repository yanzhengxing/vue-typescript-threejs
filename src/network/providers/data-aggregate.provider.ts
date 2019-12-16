import { BaseProvider } from "./base.provider";
import { DataServer } from "../servers/data.server";
/**
 * @description 数据融合
 * @author 闫正兴
 * @date 2019-11-28
 * @class DataAggregateProvide
 * @extends {BaseProvider}
 */
// tslint:disable: forin
class DataAggregateProvide extends BaseProvider {
  /** 服务器接口服务 */
  http = new DataServer();
  // tslint:disable: ter-max-len
  // tslint:disable: completed-docs
  /** 数据库类型右侧数据 */
  async getDepartmentCollectdbType(params: any) {
    console.log(params);
    const result = await this.http.get<{data: any}>(`/data_collect/system/${params.did}`, { params });
    const data = result.data.result;
    return data;
  }
}

export default new DataAggregateProvide();
