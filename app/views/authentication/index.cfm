<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<body class="bg-success bg-opacity-10">
    <cfoutput>
        <div class="container mt-5 p-4 bg-light rounded w-50 shadow">
        <h1>Add User</h1>
            <form action="#event.buildLink('authentication.save')#" method="post" class="mb-4">
                <input type="hidden" name="id" value="#rc.id ?: 0#">
                Name: <input type="text" name="name" value="#rc.name ?: ''#" class="form-control">
                Email: <input type="email" name="email" value="#rc.email ?: ''#" class="form-control"><br>
                <button type="submit" class="btn btn-primary">Save User</button>
            </form>
        </div>
        #getColdBoxSetting('version')#
    </cfoutput><br><br>
    <div class="w-75 container mt-5 p-4 bg-light rounded shadow">

            <cfset users = rc.users>
            <h2 class="mb-3">Users</h2>
            <table class="table table-bordered">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                <cfoutput query="users">
                    <tr>
                        <td>#users.name#</td>
                        <td>#users.email#</td>
                        <td class="d-flex gap-2">
                            <a href="#event.buildLink('authentication.index', {id: users.id, name: users.name, email: users.email})#" class="btn btn-sm btn-secondary">Edit</a>
                            <a href="#event.buildLink('authentication.delete', {id: users.id})#" class="btn btn-sm btn-danger">Delete</a>
                        </td>
                    </tr>
                </cfoutput>
            </table>
    </div>
    <cfdump var="#prc#">
    <cfdump var="#rc#">
</body>