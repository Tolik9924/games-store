const initialState = { snackbarShow: false, snackbarMessage: '', severity: 'success' };

const SHOW_SNACKBAR = "SHOW_SNACKBAR";
const HIDE_SNACKBAR = "HIDE_SNACKBAR";

export const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        snackbarShow: true,
        snackbarMessage: action.message,
        severity: action.severity
      }
    case HIDE_SNACKBAR:
      return {
        ...state, snackbarShow: false
      }
    default:
      return state;
  }
};

export const showSnackbar = (message, severity) => ({type: SHOW_SNACKBAR, message, severity});
export const hideSnackbar = () => ({type: HIDE_SNACKBAR});