import { BaseProvider } from "./base.provider";
import { DataServer } from "../servers/data.server";
import { DataAggregateParams } from "../../models";
/**
 * @description 数据融合
 * @author 闫正兴
 * @date 2019-11-28
 * @class DataAggregateProvide
 * @extends {BaseProvider}
 */
// tslint:disable: forin
class Assetsledgerprovider extends BaseProvider {
  /** 服务器接口服务 */
  http = new DataServer();
  // tslint:disable: ter-max-len
  /** 获取单位 */
  async fetchDepartmentOrganizational() {
    // tslint:disable-next-line: completed-docs
    const result = await this.http.get<{data: any}>(`/data_collect/tree`);
    const data = result.data.result;
    // tslint:disable-next-line:ter-max-len
    const treeData = data.map((item: any, index: number) => (
    { index,
      title: `${item.name}  (${item.childSystemNum})`,
      id: item.id,
      value: item.id,
      key: item.name,
      isLeaf: true,
      system: item.system,
      status: item.status,
      children: item.children && item.children.map((x: any, no: number) => (
      { index: no,
        title: `${x.name}  (${x.childSystemNum})`,
        id: x.id,
        value: x.id,
        key: x.name,
        isLeaf: false,
        system: x.system,
        status: x.status,
        children: x.children && x.children.map((y: any, num: number) => (
        { index: num,
          title: `${y.name}  (${y.childSystemNum})`,
          id: y.id,
          value: y.id,
          key: y.name,
          isLeaf: false,
          system: y.system,
          status: y.status,
          children: y.children && y.children.map((m: any, n: number) => ({
            index: n,
            title: `${m.name}  (${m.childSystemNum})`,
            id: m.id,
            value: m.id,
            key: m.name,
            isLeaf: false,
            system: m.system,
            status: m.status,
          })),
        })),
      }
      ))}));
    return treeData;
  }
  /** 获取部门对应的数据 */
  async getDepartmentDataList(params: DataAggregateParams) {
    // tslint:disable-next-line: completed-docs
    const result = await this.http.get<{data: any}>(`/data_collect/system/${params.did}`, { params });
    const data = result.data.result;
    return data;
  }
  /** 导出数据 */
  async exportDataList(params: any) {
    const idsArr: any = [];
    params.wrapperDto.forEach((item: any) => {
      idsArr.push(item.systemId);
    });
    const url = `${window.config.dataServer}/data_collect/excel`;
    window.open(`${url}?ids=${idsArr}`, "_blank");
    return ;
    // tslint:disable-next-line: completed-docs
    await this.http.get(`/data_collect/excel`, { params })
      .then((data: any) => {
        const blob = new Blob([data]);
        // tslint:disable-next-line: early-exit
        if ("download" in document.createElement("a")) { // 非IE下载
          const elink = document.createElement("a");
          elink.download = "excel.xlsx";
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else { // IE10+下载
          navigator.msSaveBlob(blob, "excel.xlsx");
        }
        // return data;
      });
  }
  /** 状态 */
  async getTypeEventFn() {
    const statuslist: any = await this.http.get(`/data_ledger/status_list`);
    let resultlist: any = [];
    for (const ks in statuslist) {
      resultlist = statuslist[ks].result;
    }
    return resultlist;
  }
  /** 状态右侧数据 */
  async getTypeDataEvent(types: any) {
    const typeData: any = await this.http.get(`/data_ledger/system_list?current=${types.currents}&size=${types.pageSizes}&status=${types.statust}`);
    let resultData: any = [];
    for (const ks in typeData) {
      resultData = typeData[ks].result;
    }
    return resultData;
  }
  /** 系统监控 */
  async getDataCollectMonitorController() {
    const collectArr: any = await this.http.get(`/data_collect/status_list`);
    let monitorArr: any = [];
    for (const ks in collectArr) {
      monitorArr = collectArr[ks].result;
    }
    return monitorArr;
  }
  /** 系统监控右侧数据 */
  async getDataCollectRightData(params: any) {
    const collectRightData: any = await this.http.get(`/data_collect/system_list?acceptStatus=${params.acceptStatua}&connStatus=${params.connStatusa}&current=${params.currents}&size=${params.pageSizes}`);
    let collectRightlist: any = [];
    for (const ks in collectRightData) {
      collectRightlist = collectRightData[ks].result;
    }
    return collectRightlist;
  }
}

export default new Assetsledgerprovider();
