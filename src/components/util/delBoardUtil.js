// boardUtils.js
import axios from 'axios';

async function deleteBoard(boardId) {
  try {
    await axios.delete(`boards/${boardId}`);
    console.log('After deleting board');

    var boards = this.$store.getters['userModule/getBoards'];
    const filteredBoards = boards.filter((board) => board.id !== boardId);
    this.$store.dispatch('userModule/updateBoard', filteredBoards);
    this.$router.push('/');
  } catch (error) {
    // Handle errors here
    console.error('Error deleting board:', error);
  }
}

export async function showDelDialogAndDelete(boardId) {
  try {
    await this.$confirm({
      message: 'Are you sure you want to delete this board?',
      button: {
        no: 'No',
        yes: 'Yes',
      },
      callback: (confirm) => {
        if (confirm) {
          deleteBoard.call(this, boardId);
        }
      },
    });
  } catch (error) {
    // Handle errors here
    console.error('Error opening delete dialog:', error);
  }
}
