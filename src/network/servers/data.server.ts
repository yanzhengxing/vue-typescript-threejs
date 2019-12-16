import { Business } from "./business.server";

/**
 * 服务器1
 *
 * @author 闫正兴
 * @export
 * @class DataServer
 * @extends {Business}
 */
export class DataServer extends Business {
  constructor() {
    // use extra config
    // super(window.config.publisher);
    // use local config
    // super("http://geo-engine.gagogroup.cn/api/v1");
    super(window.config.dataServer);
  }
}
