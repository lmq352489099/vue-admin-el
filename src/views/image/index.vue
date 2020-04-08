<template>
  <div>
    <el-container style="position:absolute;top:55px;left:0;right:0;bottom:0">
      <el-header class="d-flex align-items-center border-bottom">
        <!-- 头部 -->
        <div class="d-flex mr-auto">
          <el-select
            placeholder="请选择图片排序方式"
            size="mini"
            style="width:150px"
            class="mr-2"
            v-model="searchForm.order"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="biejing"></el-option>
          </el-select>
          <el-input
            size="mini"
            placeholder="请输入相册名称"
            class="mr-2"
            style="width:150px"
            v-model="searchForm.keyword"
          ></el-input>
          <el-button type="primary" size="mini">搜索</el-button>
        </div>
        <div>
          <el-button
            type="warning"
            size="mini"
            @click="unChoose"
            v-if="chooseList.length"
            >取消选中</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="imageDel({ all: true })"
            v-if="chooseList.length"
            >批量删除</el-button
          >
          <el-button type="success" size="mini" @click="openAlbumModel(false)"
            >创建相册</el-button
          >
          <el-button type="warning" size="mini" @click="uploadModel = true"
            >上传图片
          </el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边 |相册列表 -->
        <el-aside
          style="position:absolute;top:60px;left:0;right:0;bottom:60px; width:200px;"
          class="bg-white boder-right"
        >
          <ul class="list-group list-group-flush">
            <albumItem
              @change="albumChangde"
              @del="albumDel"
              @edit="openAlbumModel"
              :albumIndex="albumIndex"
              :albums="albums"
              v-for="(item, index) in albums"
              :key="index"
              :item="item"
              :index="index"
              :active="albumIndex === index"
            ></albumItem>
          </ul>
        </el-aside>
        <el-container>
          <el-main
            style="position:absolute;top:60px;left:200px;right:0;bottom:60px;"
          >
            <!-- 主内容 -->
            <el-row :gutter="10">
              <el-col
                :span="24"
                :lg="4"
                :md="6"
                :sm="8"
                v-for="(item, index) in imagesList"
                :key="index"
              >
                <el-card
                  class="box-card mb-3 position-relative"
                  :body-style="{ padding: 0 }"
                  shadow="hover"
                  style="cursor:point"
                >
                  <div
                    class="border "
                    :class="{ 'border-danger': item.ischeck }"
                   >
                    <span
                      Style="position:absolute;right:0;top:0"
                      v-if="item.ischeck"
                      class="badge badge-danger"
                    >
                      {{ item.checkOrder }}
                    </span>
                    <!-- <el-tag
                      type="danger"
                      effect="dark"
                      sizi="mini"
                      Style="position:absolute;right:0;top:0"
                      v-if="item.ischeck"
                     
                      >1</el-tag
                    > -->
                    <img
                      class="w-100"
                      style="height:100px"
                      :src="item.url"
                      alt=""
                      @click="choose(item)"
                    />
                    <div
                      class="w-100 text-white position-absolute px-1"
                      style="background:rgba(0,0,0,0.5);margin-top:-25px"
                    >
                      <span class="small"> {{ item.name }}</span>
                    </div>
                    <div class="p-2 text-center">
                      <el-button-group>
                        <el-button
                          size="mini"
                          icon="el-icon-view"
                          class="p-2"
                          @click="previewImage(item.url)"
                        ></el-button>
                        <el-button
                          icon="el-icon-edit"
                          size="mini"
                          class="p-2"
                          @click="imageEdit(item)"
                        ></el-button>
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          class="p-2"
                          @click="imageDel({ index })"
                        ></el-button>
                      </el-button-group>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <el-footer class="border-top d-flex align-items-center p-0">
        <!-- 底部 -->
        <div
          style="width:200px;flex-shrink:0"
          class="h-100 d-flex align-items-center justify-content-center border-right"
        >
          <el-button-group>
            <el-button size="mini">上一页 </el-button>
            <el-button size="mini"> 下一页 </el-button>
          </el-button-group>
        </div>
        <div class="px-2">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
    <!-- 修改 | 创建相册 -->
    <el-dialog :title="albumModelTitle" :visible.sync="albumModel">
      <el-form ref="form" label-width="80px" :model="albumForm">
        <el-form-item label="名称">
          <el-input v-model="albumForm.name" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input-number
            v-model="albumForm.order"
            :min="0"
            size="medium"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="albumModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传图片 -->
    <el-dialog title="上传图片" :visible.sync="uploadModel">
      <el-upload
        class="upload-demo text-center"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </div> -->
    </el-dialog>
    <!-- 预览图片 -->
    <el-dialog :visible.sync="previewModel" width="50vw" top="5vh">
      <div style="margin:-60px -20px -30px -20px">
        <img class="w-100" :src="prevewUrl" alt="" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import albumItem from '../../components/image/album-item';
export default {
  components: {
    albumItem,
  },
  data() {
    return {
      searchForm: {
        order: '',
        keyword: ""
      },
      albums: [],
      albumIndex: 0,
      albumModel: false,
      albumEditIndex: -1,
      albumForm: {
        name: "",
        order: ""
      },
      // 上传
      uploadModel: false,
      // 预览图片
      prevewUrl: '',
      previewModel: false,
      imagesList: [],
      // 选中的数组
      chooseList: [],
      currentPage: 1
    }
  },
  created() {
    this.__init();
  },
  computed: {
    albumModelTitle() {
      return this.albumEditIndex > -1 ? '修改相冊' : '创建相册'
    }
  },
  methods: {
    // 选中图片
    choose(item) {
      console.log(item);
      // 选中
      if (!item.ischeck) {
        // 加入选中
        this.chooseList.push({ id: item.id, url: item.url })
        // 计算序号(复制给当前的元素)
        item.checkOrder = this.chooseList.length
        // 修改状态
        item.ischeck = true
        return
      }

      // 取消选中
      // 找到chooseList中的索引,删除
      let i = this.chooseList.findIndex(v => v.id === item.id)
      if (i === -1) return
      // 重新计算序号
      let length = this.chooseList.length
      console.log(length);

      // 取消选中中间部分 ,如果等于就直接删除了
      if (i + 1 < length) {
        // 重新计算imageList选中的 序号
        for (let j = i; j < length; j++) {
          let no = this.imagesList.findIndex(v => v.id == this.chooseList[j].id)
          console.log(no);

          if (no > -1) {
            console.log(no);
            console.log(this.imagesList[no].checkOrder);

            console.log(--this.imagesList[no].checkOrder);

            //  --this.imagesList[no].checkOrder
          }
        }

      }
      // 删除
      this.chooseList.splice(i, 1)
      //修改状态
      item.ischeck = false
      // 重置序号
      item.checkOrder = 0


      // item.ischeck = !item.ischeck
      // console.log(item);
    },
    __init() {
      for (let i = 0; i < 20; i++) {
        this.albums.push({
          name: "相册" + i,
          num: Math.floor(Math.random() * 100),
          order: 0
        })

      }

      for (let i = 0; i < 20; i++) {
        this.imagesList.push({
          id: i,
          url: "http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg",
          name: "图片" + i,
          ischeck: false,
          checkOrder: 0
        }
        )

      }
    },
    // 切换相册
    albumChangde(e) {
      console.log(e);

      this.albumIndex = e
    },
    // 打开相册修改 | 创建 => 模态框
    openAlbumModel(obj) {
      console.log(obj);
      // 修改
      if (obj) {
        let { item, index } = obj
        // 初始化表单
        this.albumForm.name = item.name
        this.albumForm.order = item.order
        this.albumEditIndex = index
        // 打开模态框
        return this.albumModel = true
      }
      // 创建
      this.albumForm = {
        name: "",
        order: 0
      }
      this.albumEditIndex = -1
      this.albumModel = true

    },
    // 点击确定修改 | 创建数组
    confirmAlbumModel() {
      // 判断是否修改
      if (this.albumEditIndex > -1) {
        this.albumEdit()
        return this.albumModel = false
      }

      // 追加albums
      this.albums.unshift({
        name: this.albumForm.name,
        order: this.albumForm.order,
        num: 0
      })
      this.albumModel = false

    },
    //修改相册
    albumEdit() {
      this.albums[this.albumEditIndex].name = this.albumForm.name
      this.albums[this.albumEditIndex].order = this.albumForm.order
    },
    // 删除相册
    albumDel(index) {
      console.log(index);

      this.$confirm("是否删除该相册", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.albums.splice(index, 1)
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    // 预览图片
    previewImage(e) {
      this.prevewUrl = e
      this.previewModel = true
    },
    // 修改图片名称
    imageEdit(item) {

      this.$prompt('请输入新名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: item.name,
        inputValidator(val) {
          if (val == '') {
            return "图片名称不能为空"
          }
        }
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的新名称是: ' + value
        });
        item.name = value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });

    },
    // 删除图片
    imageDel(obj) {


      this.$confirm(obj.all ? "是否删除选中图片?" : "是否删除该图片?", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (obj.all) {
          let list = this.imagesList.filter(img => {
            return !this.chooseList.some(c => {
              return c.id == img.id
            })
          })
          console.log(list);
          this.imagesList = list
          this.chooseList = []

        } else {
          this.imagesList.splice(obj.index, 1)
        }

        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 批量删除
    imageDelAll() {


    },
    // 取消选中
    unChoose() {
      console.log(1122);

      this.imagesList.forEach(img => {
        // 找到选中的图片
        let i = this.chooseList.findIndex(item => {
          return item.id == img.id
        })
        if (i > -1) {
          // 取消选中样式,选中排序归零
          img.ischeck = false
          img.checkOrder = 0
          // 从 cheooseList中移除
          this.chooseList.splice(i, 1)
        }

      })
      //  找到所有选中的图片
      // 取消选中的样式  选中排序归0
      // 从chooseList 中移除
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },

}
</script>

<style lang="scss" scoped>
.sum-avtive {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
.el-header,
.el-footer {
}

.el-aside {
}

.el-main {
}
</style>