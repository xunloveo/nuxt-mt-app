import Router from "koa-router";
import axios from "./utils/axios";
import Province from "../dbs/models/province";
import City from "../dbs/models/city";

let router = new Router({ prefix: "/geo" });

const sign = "abcd";

router.get("/getPosition", async ctx => {
  let {
    status,
    data: { province, city }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      province,
      city
    };
  } else {
    ctx.body = {
      province: "",
      city: ""
    };
  }
});

// 获取省份
router.get("/province", async ctx => {
  // let province = await Province.find();
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     };
  //   })
  // };
  let {
    status,
    data: { province }
  } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`);
  ctx.body = {
    province: status === 200 ? province : []
  };
});

// 获取每个省份城市
router.get("/province/:id", async ctx => {
  // let city = await City.findOne({ id: ctx.params.id });
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return { province: item.province, id: item.id, name: item.name };
  //   })
  // };
  let {
    status,
    data: { city }
  } = await axios.get(
    `http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`
  );
  ctx.body = {
    city: status === 200 ? city : []
  };
});

// 获取所有城市
router.get("/city", async ctx => {
  // let city = [];
  // let result = await City.find();
  // result.map(item => {
  //   city = city.concat(item.value);
  // });
  // ctx.body = {
  //   code: 0,
  //   city: city.map(item => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name:
  //         item.name === "市辖区" || item.name === "省直辖县级行政区划"
  //           ? item.province
  //           : item.name
  //     };
  //   })
  // };
  let {
    status,
    data: { city }
  } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
  ctx.body = {
    city: status === 200 ? city : []
  };
});

// 获取热门城市
router.get("/hotCity", async ctx => {
  let {
    status,
    data: { hots }
  } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  ctx.body = {
    hots: status === 200 ? hots : []
  };
});

router.get("/menu", async ctx => {
  let {
    status,
    data: { menu }
  } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      menu
    };
  } else {
    ctx.body = {
      menu: []
    };
  }
});

export default router;
