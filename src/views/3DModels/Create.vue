<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add 3D Models</h4>
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
          <button type="button" @click="saveModel" class="btn btn-primary">
            <i class="fa-solid fa-floppy-disk"></i>
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "modelcreate",
  data() {
    return {
      errorList: "",
      model: {
        modelname: "",
        modeldescribtion: "",
        modelphoto: "",
        modelpath: "/test.glb",
      },
    };
  },
  methods: {
    saveModel() {
      var mythis = this;
      let token=localStorage.getItem('token')
      axios
        .post(`http://127.0.0.1:8000/api/models?token=${token}`, this.model)
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
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
  },
};
</script>
