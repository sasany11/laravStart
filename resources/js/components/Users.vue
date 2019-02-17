<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">System Users</h3>

                        <div class="box-tools">
                            <button class="btn btn-success float-right" @click="newModal()">Add User <i class="fa fa-user-plus fa-fw"></i></button>
                        </div>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover">
                            <tbody><tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>RegisterAt</th>
                                <th>Modify</th></tr>

                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.type}}</td>
                                <td>{{user.created_at | myDate}}</td>
                                <td>
                                    <a href="#" @click="editModal(user)"><i class="fa fa-edit blue"></i> </a>
                                    |
                                    <a href="#" @click="deleteUser(user.id)"><i class="fa fa-trash red"></i> </a>
                                </td>
                            </tr>

                            </tbody></table>
                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /.box -->
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-show="!editMode" id="ModalLabel">Add New</h5>
                        <h5 class="modal-title" v-show="editMode" id="exampleModalLabel">Update User's Info</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editMode ? updateUser() : createUser()">
                    <div class="modal-body">

                        <div class="form-group">
                            <input v-model="form.name" type="text" name="name" placeholder="Enter Your Name"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.email" type="email" name="email" placeholder="Email address"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email"></has-error>
                        </div>


                        <div class="form-group">
                            <textarea v-model="form.bio" id="bio" name="bio" placeholder="Short bio..."
                                      class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                            </textarea>
                            <has-error :form="form" field="bio"></has-error>
                        </div>

                        <div class="form-group">
                            <select v-model="form.type" id="type" name="type"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                <option value="">Enter The Type Of User</option>
                                <option value="admin">Admin</option>
                                <option value="standard user">Standard User</option>
                                <option value="author">Author</option>
                                <has-error :form="form" field="type"></has-error>
                            </select>
                        </div>

                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password" placeholder="password"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="submit" v-show="editMode" class="btn btn-success">Update</button>
                        <button type="submit" v-show="!editMode" class="btn btn-primary">Create</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                editMode:true,
                users:{},
                // Create a new form instance
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        methods:{
            updateUser(){
                this.$Progress.start();
                this.form.put('api/user/'+this.form.id)
                    .then(() => {
                        Swal.fire(
                            'Updated!',
                            'Information has been updated.',
                            'success'
                        )
                        Fire.$emit('refreshTable');
                        this.$Progress.finish();
                        $('#addNew').modal('hide');
                    })
                    .catch(() => {
                        this.$Progress.fail();
                    });
            },
            newModal(){
                this.editMode=false;
                this.form.reset();
                $('#addNew').modal('show');
            },
            editModal(user){
               this.editMode=true;
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(user);
            },
            deleteUser(id){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        // send request to server
                        this.form.delete('api/user/'+id).then(()=>{
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                                Fire.$emit('refreshTable');
                        }).catch(() =>{
                            swal('failed!' , 'There are Someting wrong' ,'Warning');
                            }

                        );



                    }
                })
            },
            loadUsers(){
                axios.get("api/user").then(({data})=>(this.users=data.data));

            },
            createUser(){
                this.$Progress.start();
                this.form.post('api/user')
                    .then(() =>{
                        Fire.$emit('refreshTable');

                        $('#addNew').modal('hide');

                        Toast.fire({
                            type: 'success',
                            title: 'Create a new User successfully'
                        })

                        this.$Progress.finish();
                    });
            }
        },
        created() {
           this.loadUsers();
           Fire.$on('refreshTable',() => {
               this.loadUsers();
           })
        }
    }
</script>
