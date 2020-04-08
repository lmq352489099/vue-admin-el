/* eslint-disable no-console */
import $Util from '@/common/util.js'
export default {
  state: {
    skus_type: 0,
    title: "",
    category: [],
    desc: '',
    unit: "",
    stock: 0,
    min_stock: 0,
    display_stock: 0,
    status: 0,
    express: "",

    oprice: 0, // 市场价格
    pprice: 0, // 销售价格
    cprice: 0, // 成本价格
    weight: 0, // 重量
    volume: 0, // 体积

    // g规格卡片
    sku_card: [{
        name: "颜色",
        type: 0,
        list: [{
            name: "黄色",
            image: "",
            color: ""
          },
          {
            name: "红色",
            image: "",
            color: ""
          }
        ]
      },
      {
        name: "颜色",
        type: 0,
        list: [{
            name: "黄色",
            image: "",
            color: ""
          },
          {
            name: "红色",
            image: "",
            color: ""
          }
        ]
      }

    ]

  },
  mutations: {
    //  修改state
    vModelState(state, { key, value }) {

      state[key] = value;

      // eslint-disable-next-line no-console
      console.log(value);



    },
    // 增加规格卡片
    addSkuCard(state) {
      state.sku_card.push({
        name: "规格名称",
        type: 0,
        list: []
      })
    },
    // 删除规格卡片
    delSkuCard(state, index) {

      state.sku_card.splice(index, 1)
    },
    // 修改规格卡片
    vMedelSkuCard(state, { key, index, value }) {

      state.sku_card[index][key] = value
    },
    // 规格卡片排序
    sortSkuCard(state, { action, index }) {
      // eslint-disable-next-line no-console
      console.log(state.sku_card, index);

      $Util[action](state.sku_card, index)
    },
    // 增加指定规格卡片的规格属性
    addSkuValue(state, index) {
      console.log(index);

      state.sku_card[index].list.push({
        name: "规格名称",
        image: "",
        color: ""
      })
    },
    // 删除指定规格卡片的属性
    delSkuValue(state, { cardIndex, index }) {
      console.log(cardIndex, index);

      state.sku_card[cardIndex].list.splice(index, 1)
    },
    // 修改指定规格卡片的规格属性
    updateSkuValue(state, { cardIndex, valueIndex, key, value }) {
      state.sku_card[cardIndex].list[valueIndex][key] = value
    },
    // 排序规格卡片的规格属性列表
    sortSkuValue(state,{index,value}){
      state.sku_card[index].list = value
      console.log(state.sku_card[index]);
      
      
    }
  },

  actions: {

  },
  getters: {

  }
}