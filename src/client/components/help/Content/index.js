import React from 'react';
import styles from './style.scss';

const summary = `“<b>菲麦在线流程测试工具</b>”基于 <a href="https://github.com/zengwenfu/freedom-api#readme">freedom-api</a> 搭建，提供可视化的流程配置界面，用户可轻松的配置满足 freedom-api 规则的接口流程组；流程提交后，由服务器端解析流程并开始进行接口请求，同时通过建立 websocket 连接，实时向浏览器端同步接口请求状态和结果，从而达到在线测试接口流程的目的。工作流程可简单用下图描述：<img src="https://upload-images.jianshu.io/upload_images/2954145-c8d84f9b0e3666dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>`;
const globalSet = `域名配置输入待测流程接口的共同域名，流程解析时会自动跟接口拼装在一起，避免重复输入。如果待测流程接口基于不同的域名，此配置留空，所有流程的接口路径输入接口全路径。`;
const pName = `流程名由总长度不超过 10 的字符串，且字符串只包含字母和数字，并保证唯一，freedom-api 在返回所有请求数据时，以此为 key 保存对应的接口数据。接口路径参数和请求参数若要用到之前流程任一接口的数据，可以通过 $allData$[对应流程name]（见内置变量小节） 进行读取。`;
const pUrl = `若全局配置中的域名配置不为空，该流程的接口路径只需要填写域名之后的部分，在解析流程阶段，程序会进行自动拼接。倘若域名配置未填写，则这里需要填写接口的全路径。对于 resful 接口的路径参数，可以使用 $data$、$allData$（见内置变量小节） 这两个预设变量读取前置流程的请求结果数据。`;
const pAssert = `可以使用内置变量 $data$（见内置变量小节）来书写简单的 Js 表达式来对单次流程的请求结果进行断言。每个流程的请求完成之后，若断言通过，则流程标圈变蓝，执行下一个流程；否则标圈变红，后面的流程将不再执行，测试不通过。`;
const pMethod = `请求类型，目前只支持 GET 和 POST，根据实际情况选择即可。`;
const pParam = `请求参数面板会依据请求类型的选择进行联动，若请求类型选择了 GET，则参数面板显示为 Key -> Value 的表格输入形式（x-www-form-urlencoded）；若请求类型选择为 POST，则还可以选择两种 body 参数的编码方式，分别为 x-www-form-urlencoded 和 json（目前不支持其它编码格式，大部分接口都是使用这两种编码方式），默认勾选前者。`;
const addCP = `添加一个串行的流程。`;
const addAP = `添加一个与当前流程并行的流程。`;
const deleteP = `删除当前流程。`;
const demo = `流程配置界面右上角有一个按钮“注入 demo”， 点击按钮之后，将会注入预设好的 demo 流程，供体验参考。需要注意已经配置好的流程不被 demo 流程重置。`;
const data = `接口的请求参数、url 参数，可以通过 $data$ 读取上一个步骤的返回数据。如果上一个流程是一个只包含一个接口的串行流程，则 $data 代表该接口的 response body；如果上一个步骤为一组并行的流程，则 $data$ 是由所有流程接口的 response body 组成的数组。如果 response body 为 json 结构，将会解析为 json Object。`
const cData = `串行举例：/testFApi/getDetail/$data$.data[0].id。`;
const bData = `并行举例：$data$[1].data[0].id。`;
const assertData = `在断言表达式中，$data$ 代表当前接口的返回 body，例如：$data$.code===0，表式接口返回结果为 Json 格式且 code 为 0 时断言通过。`;
const allData = `$allData$ 可以用于读取当前流程之前的所有流程的 response header 和 response body（注意，不可以读取与当前流程并行的流程数据），以流程的 name 值为 key。例如：读取 login 流程的返回值 isLogin，$allData$.login.body.data.isLogin。`;
class Content extends React.Component {
  render() {
    return (
      <div className={[styles.wrap, 'main-content'].join(' ')}>
        <div className={styles.content}>
          <h2 className={styles.title}>一、概述</h2>
          <p dangerouslySetInnerHTML={{__html: summary}} />
          <h2 className={styles.title}>二、Demo 注入</h2>
          <p dangerouslySetInnerHTML={{__html: demo}} />
          <h2 className={styles.title}>三、配置说明</h2>
          <h3 className={styles.subTitle}>1）全局配置 -> 域名配置</h3>
          <p dangerouslySetInnerHTML={{__html: globalSet}} />
          <h3 className={styles.subTitle}>2）流程配置 -> 流程名</h3>
          <p dangerouslySetInnerHTML={{__html: pName}} />
          <h3 className={styles.subTitle}>3）流程配置 -> 接口路径</h3>
          <p dangerouslySetInnerHTML={{__html: pUrl}} />
          <h3 className={styles.subTitle}>5）流程配置 -> 结果断言</h3>
          <p dangerouslySetInnerHTML={{__html: pAssert}} />
          <h3 className={styles.subTitle}>6）流程配置 -> 请求类型</h3>
          <p dangerouslySetInnerHTML={{__html: pMethod}} />
          <h3 className={styles.subTitle}>7）流程配置 -> 请求参数</h3>
          <p dangerouslySetInnerHTML={{__html: pParam}} />
          <h3 className={styles.subTitle}>8）添加串行流程</h3>
          <p dangerouslySetInnerHTML={{__html: addCP}} />
          <h3 className={styles.subTitle}>9）添加串行流程</h3>
          <p dangerouslySetInnerHTML={{__html: addAP}} />
          <h3 className={styles.subTitle}>10）删除流程</h3>
          <p dangerouslySetInnerHTML={{__html: deleteP}} />
          <h2 className={styles.title}>四、内置变量说明</h2>
          <h3 className={styles.subTitle}>1) $data$（参数）</h3>
          <p dangerouslySetInnerHTML={{__html: data}} />
          <p dangerouslySetInnerHTML={{__html: cData}} />
          <p dangerouslySetInnerHTML={{__html: bData}} />
          <h3 className={styles.subTitle}>2) $data$（断言）</h3>
          <p dangerouslySetInnerHTML={{__html: assertData}} />
          <h3 className={styles.subTitle}>3) $allData$</h3>
          <p dangerouslySetInnerHTML={{__html: allData}} />
        </div>
      </div>
    );
  }
}

export default Content;
