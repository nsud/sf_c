<template>
  <div class="container">
    <div class="col-sm-10">
      <h1>Задачи</h1>
      <confirmation :message="confirmationMessage"
                    :showMsg="showConfirmation"
                    v-if="showConfirmation">
      </confirmation>
      <div content-class="mt-3">
          <b-button id="task-add"
                  variant="success"
                  v-b-modal.todo-modal>
            Добавить задачу
          </b-button>
          <b-button variant="warning"
                  @click="removeList()">
            Очистить список
          </b-button>
      </div>
      <counter
        :finished="todos.length-sumTasks"
        :unfinished="sumTasks"></counter>
      <table class="table table-dark table-stripped table-hover">
        <thead class="thead-light">
          <tr>
            <th>Uid</th>
            <th>Описание</th>
            <th>Статус</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(todo, index) in todos" :key="index">
            <td class="todo-uid">{{ todo.uid }}</td>
            <td>{{ todo.description }}</td>
            <td>
              <span v-if="todo.is_completed == 'true'">Выполнено</span>
              <span v-else>Не выполнено</span>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button type="button"
                        class="btn btn-secondary btn-sm"
                        v-b-modal.todo-update-modal
                        @click="updateTodo(todo)">
                  Обновить
                </button>
                &nbsp;
                <button type="button"
                        class="btn btn-danger btn-sm"
                        @click="deleteTodo(todo)">
                  X
                </button>
              </div>
            </td>
          </tr>

        </tbody>

      </table>

      <b-modal ref="addTodoModal"
         id="todo-modal"
         title="Добавить задачу"
         hide-footer>
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
          <b-form-group id="form-description-group"
                        label="Описание:"
                        label-for="form-description-input">
            <b-form-input id="form-description-input"
                          type="text"
                          v-model="addTodoForm.description"
                          required
                          placeholder="Завести задачу">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-complete-group">
            <b-form-checkbox-group v-model="addTodoForm.is_completed" id="form-checks">
              <b-form-checkbox value="true">Задача выполнена?</b-form-checkbox>
            </b-form-checkbox-group>
            </b-form-group>
            <b-button type="submit" variant="primary">Добавить</b-button>
            <b-button type="reset" variant="danger">Сброс</b-button>
        </b-form>
      </b-modal>

      <b-modal ref="updateTodoModal"
         id="todo-update-modal"
         title="Update"
         hide-footer>
        <b-form @submit="onUpdateSubmit" @reset="onUpdateReset" class="w-100">
        <b-form-group id="form-update-description-group"
                      label="Описание:"
                      label-for="form-update-description-input">
          <b-form-input id="form-update-description-input"
                        type="text"
                        v-model="updateTodoForm.description"
                        required>
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-update-complete-group">
          <b-form-checkbox-group v-model="updateTodoForm.is_completed" id="form-update-checks">
            <b-form-checkbox v-model="addTodoForm.is_completed"
                              value="true">Задача выполнена?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Обновить</b-button>
          <b-button type="reset" variant="danger">Сброс</b-button>
        </b-button-group>
        </b-form>
      </b-modal>

    </div>

  </div>
</template>

<style>
button#task-add {
  margin-top: 20px;
  margin-bottom: 20px;
}
h1, td {
  text-align: left;
}
.todo-uid {
  text-align: right;
}
</style>

<script>
import Confirmation from './Confirmation.vue';
import Count from './Count.vue';

export default {
  name: 'Todo',
  data() {
    return {
      todos: [],
      key: 1,
      addTodoForm: {
        description: '',
        is_completed: [],
      },
      updateTodoForm: {
        uid: 0,
        description: '',
        is_completed: [],
      },
      confirmationMessage: '',
      showConfirmation: false,
      sumTasks: 0,
      nTasks: 0,
    };
  },
  methods: {
    getTasks() {
      const myList = [];
      for (let i = 1; i <= localStorage.length; i += 1) {
        if (localStorage.getItem(i)) {
          const getId = localStorage.getItem(i).split(';')[0];
          const getDesc = localStorage.getItem(i).split(';')[1];
          const getIsComleted = localStorage.getItem(i).split(';')[2];
          const myDict = { description: getDesc, is_completed: getIsComleted, uid: getId };
          myList.push(myDict);
        }
      }
      this.todos = myList;
      if (this.todos.length === 0) {
        this.confirmationMessage = 'У вас еще нет задач в листе';
        this.showConfirmation = true;
      }
      this.taskCount();
    },
    resetForm() {
      this.addTodoForm.description = '';
      this.addTodoForm.is_completed = [];
      this.updateTodoForm.description = '';
      this.updateTodoForm.is_completed = [];
      this.taskCount();
    },
    onSubmit(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      const id = localStorage.length + 1;
      const desc = this.addTodoForm.description;
      const comleted = this.addTodoForm.is_completed[0] ? 'true' : 'false';
      localStorage.setItem(id, `${id};${desc};${comleted}`);
      this.getTasks();
      this.key += 1;
      this.confirmationMessage = `Задание "${desc}" добавлено. ID ${id}`;
      this.showConfirmation = true;
      this.taskCount();
    },
    onReset(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      this.resetForm();
      this.taskCount();
    },
    deleteTodo(todo) {
      console.log(todo.uid);
      localStorage.removeItem(todo.uid);
      this.getTasks();
      this.taskCount();
    },
    updateTodo(todo) {
      this.updateTodoForm = todo;
      const id = Number(this.updateTodoForm.uid);
      const desc = this.updateTodoForm.description;
      const stat = this.updateTodoForm.is_completed;
      localStorage.setItem(id, `${id};${desc};${stat}`);
      this.confirmationMessage = `Задание "${todo.description}" обновлено`;
      this.showConfirmation = true;
      this.taskCount();
    },
    onUpdateSubmit(event) {
      event.preventDefault();
      this.$refs.updateTodoModal.hide();
      const id = Number(this.updateTodoForm.uid);
      const desc = this.updateTodoForm.description;
      const stat = this.updateTodoForm.is_completed;
      localStorage.setItem(id, `${id};${desc};${stat}`);
      this.taskCount();
    },
    onUpdateReset(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      this.taskCount();
    },
    taskCount() {
      this.sumTasks = 0;
      for (let i = 0; i <= this.todos.length; i += 1) {
        if (this.todos[i].is_completed === 'false') {
          this.sumTasks += 1;
        } else {
          break;
        }
      }
    },
    removeList() {
      localStorage.clear();
      this.todos = [];
      this.confirmationMessage = 'Все задания удалены';
      this.showConfirmation = true;
      this.taskCount();
    },
  },
  components: {
    confirmation: Confirmation,
    counter: Count,
  },
  created() {
    if (localStorage.length !== 0) {
      this.getTasks();
    } else {
      localStorage.clear();
    }
  },
};
</script>
