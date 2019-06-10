<template id="">
  <div class="">
    <h2>Documentation</h2>
    <p class="indent">
      SQL is domain-specific language used for managing data in a relational database.<br/>
      With SQL, data as stored in the form of relations (tables).
    </p>
    <div class="my-4">
      <h3>Example</h3>
      <div class="card mx-5 my-3 p-0 w-auto border bg-white border-secondary">
        <h5 class="pt-2 pl-3">Users</h5>
        <b-table striped hover fixed bordered :items="items" class="m-0  text-center"></b-table>
      </div>
      <p class="indent">The relation Users stores Login, Surname, Firstname and Password of each users.</p>
    </div>
    <div class="my-4">
      <h3>SQL queries</h3>
      <p>Sql is provide with multiple queries to manage and retrieving data :
        <ul>
          <li>SELECT (to retrieve data)</li>
          <li>CREATE (to create table )</li>
          <li>INSERT INTO (to add data in table)</li>
          <li>UPDATE (to update data in table)</li>
          <li>ALTER (to update table)</li>
          <li>DELETE (to delete table)</li>
        </ul>
      </p>
      <h4>Select querie</h4>
      <p class="indent">Select queries are the most used queries. It is used to retrieve data from the database</p>
      <div class="mx-5 my-3">
        <p class="p-4 w-auto border bg-white border-secondary rounded "><span class="text-danger">SELECT</span> <span class="text-success">[ columns ]</span> <span class="text-danger">FROM</span> <span class="text-info">[ table ]</span> <span class="text-secondary">[ WHERE <span class="text-primary">[ condition ]</span> ]</span> <span class="text-danger">;</span></p>
        <ul>
          <li><span class="text-danger">SELECT</span> ... <span class="text-danger">FROM</span> ... <span class="text-danger">;</span> : this is the skeleton of select queries.</li>
          <li><span class="text-success">columns</span> : names of columns you want to get or '*' if you want all columns.</li>
          <li><span class="text-info">table</span> : from which table you get data.</li>
          <li><span class="text-secondary">[ WHERE <span class="text-primary">[ condition ]</span> ]</span> : to apply a condition to the selected data. If you don't want to precise a condition there is no need to put a WHERE statement.</li>
        </ul>
      </div>
      <h5 class="ml-4">Example :</h5>
      <p class="ml-4">If we want to select every thing from "users", we can uses the ( * ) symbol insted of columns name's :</p>
      <p class="mx-5 my-3 p-4 w-auto border bg-white border-secondary rounded"><span class="text-danger">SELECT</span> <span class="text-success">*</span> <span class="text-danger">FROM</span> <span class="text-info">users</span> <span class="text-danger">;</span></p>
      <p class="ml-4">If we want to select the "Firstname" and "Surname" where login = User2 and password = azerty from User's table : </p>
      <p class="mx-5 my-3 p-4 w-auto border bg-white border-secondary rounded"><span class="text-danger">SELECT</span> <span class="text-success">firstname, surname</span> <span class="text-danger">FROM</span> <span class="text-info">users</span> <span class="text-secondary"> WHERE <span class="text-primary">login = 'User2'</span> AND <span class="text-primary">password = 'azerty'</span></span> <span class="text-danger">;</span></p>
    </div>
    <div class="my-4">
      <h3>SQL injection</h3>
      <p class="indent">Now you know how select queris works, you will have to find a way to modify the condition so it return true and will get access without knowing the password.</p>
      <p>Tips :
        <ul>
          <li>-- : to comment what is after it and prevent SQL from interpreting it</li>
          <li>' ' : use simple quote to open or close a string value</li>
          <li>; : every SQL querie are ended by a semicolon</li>
        </ul>
      </p>
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
