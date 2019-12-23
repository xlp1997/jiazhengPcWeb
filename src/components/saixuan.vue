<template>
  <div style="margin-bottom:10px">
    <div v-if="type=='最新招聘'" style="margin-bottom: 20px;" class="item-box">
      <div class="title">地区：</div>
      <div style="float:left;">
        <Cascader @on-change="cityChang" :data="shenzhen" v-model="cityValue"></Cascader>
      </div>
    </div>
    <div style="clear:both"></div>

    <div class="item-box">
      <div class="title">岗位：</div>
      <div v-if="type=='阿姨推荐'">
        <div
          class="item-tag"
          :class="item.checked?'item-tag-s':'item-tag-n'"
          @click="itemSerivceClick(item,index)"
          v-for="(item,index) in serviceList"
          :key="index"
        >{{item.serviceName}}</div>
      </div>
      <div v-if="type=='最新招聘'">
        <div
          class="item-tag"
          :class="item.checked?'item-tag-s':'item-tag-n'"
          @click="itemSerivceClick(item,index)"
          v-for="(item,index) in serviceList"
          :key="index"
        >{{item.serviceName}}</div>
      </div>
    </div>
    <div style="clear:both"></div>
    <div v-if="type=='最新招聘'&&salaryList.length>0" class="item-box">
      <div class="title">薪资：</div>
      <div
        class="item-tag"
        :class="salaryIndex==index?'item-tag-s':'item-tag-n'"
        @click="salaryItemClick(item,index)"
        v-for="(item,index) in salaryList"
        :key="index"
      >{{item.sysValue}}</div>
    </div>
    <div v-if="type=='阿姨推荐'&&ageList.length>0" class="item-box">
      <div class="title">年龄：</div>
      <div
        @click="ageItemClick(item,index)"
        class="item-tag"
        :class="ageIndex==index?'item-tag-s':'item-tag-n'"
        v-for="(item,index) in ageList"
        :key="index"
      >{{item.sysValue}}</div>
    </div>

    <div style="clear:both"></div>
    <div class="item-box" v-if="workExperience.length>0">
      <div class="title">经验：</div>
      <div
        class="item-tag"
        @click="workItemClick(item,index)"
        :class="workIndex==index?'item-tag-s':'item-tag-n'"
        v-for="(item,index) in workExperience"
        :key="index"
      >{{item.sysValue}}</div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>
<script>
import area from "../../static/utils/area";
import env from "../../static/utils/env";
import axios from "axios";
// 最新招聘
// 阿姨推荐
export default {
  props: ["type"],
  data() {
    return {
      city: [],
      cityValue: ["440000", "440300", "440302"],
      shenzhen: [
        {
          value: "440000",
          label: "广东省",
          children: [
            {
              value: "440300",
              label: "深圳市",
              children: [
                {
                  value: "440302",
                  label: "全部"
                },
                {
                  value: "440303",
                  label: "罗湖区"
                },
                {
                  value: "440304",
                  label: "福田区"
                },
                {
                  value: "440305",
                  label: "南山区"
                },
                {
                  value: "440306",
                  label: "宝安区"
                },
                {
                  value: "440307",
                  label: "龙岗区"
                },
                {
                  value: "440308",
                  label: "盐田区"
                },
                {
                  value: "440309",
                  label: "龙华区"
                },
                {
                  value: "440310",
                  label: "坪山区"
                },
                {
                  value: "440311",
                  label: "光明区"
                }
              ]
            }
          ]
        }
      ],
      workExperience: [],
      salaryList: [],
      salaryIndex: null,
      ageList: [],
      ageIndex: null,
      workIndex: null,
      serviceList: [],
      serviceStr: "",
      salary: "",
      age: "",
      serviceIndex: null,
      serviceId: "",
      experience: "",
      workAddress: ""
    };
  },
  watch: {
    serviceStr(val) {
      this.saiData();
      // this.$emit();
    },
    salaryIndex(val) {
      this.salary = this.salaryList[val].sysValue;
      this.saiData();
    },
    ageIndex(val) {
      this.age = this.ageList[val].sysValue;
      this.saiData();
    },
    workIndex(val) {
      this.experience = this.workExperience[val].sysValue;
      this.saiData();
    },
    workAddress(val) {
      this.saiData();
    },
    serviceIndex(val) {
      this.serviceId = this.serviceList[val].serviceId;
      this.saiData();
    }
  },
  methods: {
    cityChang(value, selectedData) {
      var ct = [];
      console.log(value, selectedData);
      selectedData.forEach((item, index) => {
        ct.push(item.label);
      });
      console.log(ct);
      if (ct[2] == "全部") {
        this.workAddress = "";
      } else {
        this.workAddress = ct.join("-");
      }
    },
    saiData() {
      // serviceId	服务id
      // salary	薪资 传名称
      // experience	经验要求 传名称
      // workAddress	地区
      // serviceIdStr	服务id 多选传这个
      var data = {
        salary: this.salary,
        experience: this.experience,
        serviceIdStr: this.serviceStr,
        workAddress: this.workAddress,
        userAge: this.age,
        serviceId: this.serviceId
      };
      this.$emit("saiData", data);
    },
    salaryItemClick(item, index) {
      this.salaryIndex = index;
    },
    ageItemClick(item, index) {
      this.ageIndex = index;
    },
    itemSerivceClick(item, index) {
      console.log(this.type);
      if (this.type == "阿姨推荐") {
        // this.serviceIndex = index;
          item.checked = !item.checked;
        var a = [];
        this.serviceList.forEach((item, index) => {
          if (item.checked) {
            a.push(item.serviceId);
          }
        });

        this.serviceStr = a.join(",");
      }
      if (this.type == "最新招聘") {
        item.checked = !item.checked;
        var a = [];
        this.serviceList.forEach((item, index) => {
          if (item.checked) {
            a.push(item.serviceId);
          }
        });

        this.serviceStr = a.join(",");
      }
    },
    workItemClick(item, index) {
      this.workIndex = index;
    },

    seriverList() {
      axios.post(env.serviceInfo, { serviceType: 1 }).then(_ => {
        let res = _.data;
        if (res.reCode == 100) {
          if (res.data) {
            if (res.data.dateCode == 200) {
              if (res.data.serviceList) {
                this.serviceList = res.data.serviceList.map(function(item) {
                  return {
                    serviceName: item.serviceName,
                    serviceId: item.serviceId,
                    checked: false
                  };
                });
              }
            } else {
              this.$Message["error"]({
                background: true,
                content: res.data.dateMsg
              });
            }
          }
        } else {
          this.$Message["error"]({
            background: true,
            content: "加载失败 " + res.reMsg
          });
        }
      });
    },
    sysDictOrder() {
      axios.post(env.sysDictOrder, {}).then(_ => {
        let res = _.data;
        if (res.reCode == 100) {
          if (res.data) {
            if (res.data.dateCode == 200) {
              if (res.data.workExperience) {
                this.workExperience = res.data.workExperience;
              }
              if (res.data.salary) {
                this.salaryList = res.data.salary;
              }
            } else {
              this.$Message["error"]({
                background: true,
                content: res.data.dateMsg
              });
            }
          }
        } else {
          this.$Message["error"]({
            background: true,
            content: "加载失败 " + res.reMsg
          });
        }
        console.log("resres", res.data);
        // this.list = res.data;
      });
    },
    sysDictPersonal() {
      axios
        .post(env.sysDictPersonal, {
          params: {}
        })
        .then(_ => {
          let res = _.data;
          if (res.reCode == 100) {
            if (res.data) {
              if (res.data.dateCode == 200) {
                if (res.data.workExperience) {
                  this.workExperience = res.data.workExperience;
                }
                if (res.data.ageList) {
                  this.ageList = res.data.ageList;
                }
              } else {
                this.$Message["error"]({
                  background: true,
                  content: res.data.dateMsg
                });
              }
            }
          } else {
            this.$Message["error"]({
              background: true,
              content: "加载失败 " + res.reMsg
            });
          }
        });
    }
  },
  mounted() {
    if (this.type == "最新招聘") {
      this.sysDictOrder();
    }
    if (this.type == "阿姨推荐") {
      this.sysDictPersonal();
    }

    this.seriverList();
    console.log(this.type);
    this.city = area.city;
    console.log(area.city);
  }
};
</script>
<style>
.ivu-input {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  color: #909090;
  background-color: #fff;
}
</style>
<style lang="less" scoped>
.item-box {
  line-height: 40px;
  width: 100%;
  height: 30px;
  font-size: 14px;
  .title {
    float: left;
    line-height: 28px;
    color: #909090;
  }
  .item-tag {
    cursor: pointer;

    font-weight: 400;
    padding: 3px 10px;
    border-radius: 2px;

    line-height: 20px;
    letter-spacing: 1px;
    float: left;
    margin-right: 16px;
    margin-bottom: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
  }
  .item-tag-s {
    background: #00a05a;
    border: 1px solid #00a05a;
    color: #ffffff;
  }
  .item-tag-n {
    background: #ffffff;
    border: 1px solid rgba(224, 224, 224, 1);
    color: #909090;
  }
}
</style>