export default Vue.component('connection-error', {
    props: ['connectionerr'],
    template: `
    <div class="connection-error" v-if="connectionerr">
      <p>Ошибка при соединении с сервером</p>
    </div>
    `
});