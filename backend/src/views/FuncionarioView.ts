import { port } from '../server';

export default {
  render(funcionario: any) {
    return {
      ...funcionario,
      avatar: funcionario.avatar
      ? `http://localhost:${port}/uploads/${funcionario.avatar}`
      : null
    }
  },

  renderMany(funcionarios: any[]) {
    return funcionarios.map(funcionario => this.render(funcionario));
  }
}