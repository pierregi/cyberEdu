<template id="">
  <div class="">
    <h2 class="text-danger">Documentation</h2>
    <p class="indent">
      SQL is domain-specific language used for managing data in a relational database.<br/>
      With SQL, data as stored in the form of relations (tables).
    </p>
    <div class="my-4">
      <h3 class="text-info">Example :</h3>
      <div class="card mx-5 my-3 p-0 w-auto border bg-white border-secondary">
        <h5 class="pt-2 pl-3">Users</h5>
        <b-table striped hover fixed bordered :items="items" class="m-0  text-center"></b-table>
      </div>
      <p class="indent">The relation Users stores Login, Surname, Firstname and Password of each users.</p>
    </div>
    <div class="my-4">
      <h3 class="text-danger">SQL queries</h3>
      <p>Sql is provide with multiple queries to manage and retrieving data :
        <ul>
          <li><span class="text-danger">SELECT</span> (to retrieve data)</li>
          <li><span class="text-danger">CREATE</span> (to create table )</li>
          <li><span class="text-danger">INSERT</span> INTO (to add data in table)</li>
          <li><span class="text-danger">UPDATE</span> (to update data in table)</li>
          <li><span class="text-danger">ALTER</span> (to update table)</li>
          <li><span class="text-danger">DELETE</span> (to delete table)</li>
        </ul>
      </p>
      <h4 class="text-danger">Select querie</h4>
      <p class="indent">Select queries are the most used queries. It is used to retrieve data from the database</p>
      <div class="mx-5 my-3">
        <p class="p-4 w-auto border bg-white border-secondary rounded "><span class="text-danger">SELECT</span> <span class="text-success">[ columns ]</span> <span class="text-danger">FROM</span> <span class="text-info">[ table ]</span> <span class="text-secondary">[ WHERE <span class="text-primary">[ condition ]</span> ]</span> <span class="text-danger">;</span></p>
        <ul>
          <li><span class="text-danger">SELECT</span> ... <span class="text-danger">FROM</span> ... <span class="text-danger">;</span> : this is the skeleton of select queries.</li>
          <li><span class="text-success">columns</span> : names of columns you want to get or ( <span class="text-success">*</span> ) symbol if you want all columns.</li>
          <li><span class="text-info">table</span> : from which table you get data.</li>
          <li><span class="text-secondary">[ WHERE <span class="text-primary">[ condition ]</span> ]</span> : to apply a <span class="text-primary">condition</span> to the <span class="text-danger">selected data</span>. If you don't want to precise a <span class="text-primary">condition</span> there is no need to put a <span class="text-secondary">WHERE</span> statement.</li>
        </ul>
      </div>
      <h5 class="ml-4 text-info">Example :</h5>
      <p class="ml-4">If we want to select every thing from <span class="text-success">"users"</span>, we can uses the ( <span class="text-success">*</span> ) symbol insted of columns name's :</p>
      <p class="mx-5 my-3 p-4 w-auto border bg-white border-secondary rounded"><span class="text-danger">SELECT</span> <span class="text-success">*</span> <span class="text-danger">FROM</span> <span class="text-info">users</span> <span class="text-danger">;</span></p>
      <p class="ml-4">If we want to select the <span class="text-success">"Firstname"</span> and <span class="text-success">"Surname"</span> <span class="text-secondary">WHERE</span> <span class="text-primary">login = User2</span> and <span class="text-primary">password = azerty</span> from <span class="text-success">User's table</span> : </p>
      <p class="mx-5 my-3 p-4 w-auto border bg-white border-secondary rounded"><span class="text-danger">SELECT</span> <span class="text-success">firstname, surname</span> <span class="text-danger">FROM</span> <span class="text-info">users</span> <span class="text-secondary"> WHERE <span class="text-primary">login = 'User2'</span> AND <span class="text-primary">password = 'azerty'</span></span> <span class="text-danger">;</span></p>
    </div>
    <div class="my-4">
      <h3 class="text-danger">SQL injection</h3>
      <p class="indent">Now you know how select queris works, you will have to find a way to modify the condition so it return true so the app will grant you access to an user account without knowing the password.</p>
      <p><font-awesome-icon :icon="['far', 'lightbulb']"/> You may use this characters  :
        <ul>
          <li><span class="text-primary">--</span> : use double hyphen to comment what is after and prevent SQL from interpreting it</li>
          <li><span class="text-success">' '</span> : use simple quote to open or close a string value</li>
          <li><span class="text-danger">;</span> : every SQL querie are ended by a semicolon</li>
        </ul>
      </p>
      <p>SQL injection can be use for more than just obtain an user access but we wont see that here.</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['sideDoc'],
  data () {
    return {
      items: [
        {'login': 'User', 'surname': 'user', 'firstname': 'test', 'password': 'password1'},
        {'login': 'User2', 'surname': 'user2', 'firstname': 'test2', 'password': 'azerty'},
        {'login': 'User3', 'surname': 'use3', 'firstname': 'test3', 'password': 'qwerty'}
      ]
    }
  }
}

</script>
<style>

</style>
