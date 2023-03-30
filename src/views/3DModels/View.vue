<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>
          3D Models
          <RouterLink to="/model/create" class="btn btn-primary float-end">
            <i class="fa-solid fa-circle-plus fa-lg"></i>
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <div class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Model Name</th>
              <th>Model Describtion</th>
              <th>Model photo</th>
              <th>Model path</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-if="models.length > 0">
            <tr v-for="(model, index) in models" :key="index">
              <td>{{ model.id }}</td>
              <td>{{ model.modelname }}</td>
              <td>{{ model.modeldescribtion }}</td>
              <td>{{ model.modelphoto }}</td>
              <td>{{ model.modelpath }}</td>
              <td>
                <RouterLink
                  :to="{ path: '/model/' + model.id + '/edit' }"
                  class="btn btn-success"
                >
                  <i class="fa-solid fa-pen-to-square fa-sm"></i>
                </RouterLink>
                <RouterLink
                  :to="{ path: '/model/' + model.id + '/view' }"
                  class="btn btn-primary ms-1 me-1"
                >
                  <i class="fa-solid fa-eye fa-sm"></i>
                </RouterLink>
                <button
                  type="button"
                  @click="deleteModel(model.id)"
                  class="btn btn-danger"
                >
                  <i class="fa-solid fa-trash fa-sm"></i>
                </button>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="4">
                <div class="d-flex justify-content-center">
                  <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "3dmodels",
  data() {
    return {
      models: [],
    };
  },
  mounted() {
    this.getAllModels();
  },
  methods: {
    getAllModels() {
      axios
        .get(`http://127.0.0.1:8000/api/models`)
        .then((res) => (this.models = res.data.models));
    },
    deleteModel(modelId) {
      let token = localStorage.getItem("token");
      // if (confirm("Are you super, You want to delete the data ?")) {
      //   axios
      //     .delete(`http://127.0.0.1:8000/api/models/${modelId}/delete?token=${token}`)
      //     .then((res) => {
      //       alert(res.data.message);
      //       this.getAllModels();
      //     })
      //     .catch(function (error) {
      //       if (error.response) {
      //         if (error.response.status == 404)
      //           alert(error.response.data.message);
      //       }
      //     });
      // }
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `http://127.0.0.1:8000/api/models/${modelId}/delete?token=${token}`
            )
            .then((res) => {
              if (res.data.status == "200") {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                this.getAllModels();
              }
            });
        }
      });
    },
  },
};
</script>
<style>
tbody tr td {
  min-height: 90px;
  line-height: 90px;
}
tbody tr td:last-child {
  min-width: 150px;
}
.card-header {
  background: #000046; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #1cb5e0,
    #000046
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #1cb5e0,
    #000046
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.card-header h4 {
  color: #fff;
}
.card-body {
  background: #be93c5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #7bc6cc,
    #be93c5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #7bc6cc,
    #be93c5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
body {
  background-image: url("../../assets/pattern.jpg");
  background-size: 200px;
}
@media (max-width: 991px) {
  .table {
    overflow-x: scroll ;
  }
}
</style>
