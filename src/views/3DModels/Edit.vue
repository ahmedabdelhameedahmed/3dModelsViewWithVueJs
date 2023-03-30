<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit 3D Model</h4>
      </div>
      <div class="card-body">
        <ul
          class="alert alert-danger"
          v-if="Object.keys(this.errorList).length > 0"
        >
          <li
            class="mb-0 ms-3"
            v-for="(error, index) in this.errorList"
            :key="index"
          >
            {{ error[0] }}
          </li>
        </ul>
        <div class="mb-3">
          <label for="">ModelName</label>
          <input type="text" class="form-control" v-model="model.modelname" />
        </div>
        <div class="mb-3">
          <label for="">ModelDescription</label>
          <input
            type="text"
            class="form-control"
            v-model="model.modeldescribtion"
          />
        </div>
        <div class="mb-3">
          <label for="">ModelPhoto</label>
          <input type="text" class="form-control" v-model="model.modelphoto" />
        </div>
        <div class="mb-3">
          <label for="">ModelPath</label>
          <input type="text" class="form-control" v-model="model.modelpath" />
        </div>
        <div class="mb-3">
          <button type="button" @click="updateModel" class="btn btn-primary">
            Update
            <i class="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "modeledit",
  data() {
    return {
      modelId:'',
      errorList: "",
      model: {
        modelname: "",
        modeldescribtion: "",
        modelphoto: "",
        modelpath: "",
      },
    };
  },
  mounted() {
    this.modelId=this.$route.params.id;
    this.getModelData(this.$route.params.id);
  },
  methods: {
    getModelData(modelId) {
      axios
        .get(`http://127.0.0.1:8000/api/models/${modelId}/edit`)
        .then((res) => {
          console.log(res.data);
          this.model = res.data.model;
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          }
        });
    },
    updateModel() {
      var mythis = this;
      let token=localStorage.getItem('token')
      axios
        .put(`http://127.0.0.1:8000/api/models/${this.modelId}/edit?token=${token}`, this.model)
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: res.data.message,
          });
          this.model = {
            modelname: "",
            modeldescribtion: "",
            modelphoto: "",
            modelpath: "",
          };
          this.errorList = "";
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 422) {
              mythis.errorList = error.response.data.errors;
            }
          } 
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          }
        });
    },
  },
};
</script>
