import ChartCard from './ChartCard';
import Field from './Field';
import Trend from './Trend';
import MiniArea from './MiniArea';
import MiniBar from './MiniBar';
import MiniProgress from './MiniProgress';
import MiniRank from './MiniRank';
import Bar from './Bar';
import Pie from './Pie';
import Radar from "./Radar";

/**
 * 传入图表中的参数  name value
 */
const Charts = {
  /**
   * 显示简单信息的Card
   */
  ChartCard,
  /**
   * 显示 name - value 信息的 div
   */
  Field,
  /**
   * 显示上升、下降箭头的 div，例如展示 ‘日同比’、‘周同比’等信息时可以使用
   */
  Trend,
  /**
   * 简版面积图
   */
  MiniArea,
  /**
   * 简版柱状图
   */
  MiniBar,
  /**
   * 简版进度条
   */
  MiniProgress,
  /**
   * 排名列表
   */
  MiniRank,
  /**
   * 柱状图
   */
  Bar,
  /**
   * 饼形图
   */
  Pie,
  /**
   * 雷达图
   */
  Radar,
}

export {
  Charts as default,
  ChartCard,
  Field,
  Trend,
  MiniArea,
  MiniBar,
  MiniProgress,
  MiniRank,
  Bar,
  Pie,
  Radar,
}
