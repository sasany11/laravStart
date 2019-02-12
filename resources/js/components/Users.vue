<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">System Users</h3>

                        <div class="box-tools">
                            <button class="btn btn-success float-right" data-toggle="modal" data-target="#addNew">Add User <i class="fa fa-user-plus fa-fw"></i></button>
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
                                <th>Modify</th>
                            <tr>
                                <td>657</td>
                                <td>Bob Doe</td>
                                <td>11-7-2014</td>
                                <td><span class="label label-primary">Approved</span></td>
                                <td>
                                    <a><i class="fa fa-edit blue"></i> </a>
                                    |
                                    <a><i class="fa fa-trash red"></i> </a>
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
                        <h5 class="modal-title" id="exampleModalLabel">Add New</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createUser">
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
                            <input v-model="form.password" type="password" name="password" placeholder="Email address"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Create</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                // Create a new form instance
                form: new Form({
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
            createUser(){
                this.form.post('api/user')
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
