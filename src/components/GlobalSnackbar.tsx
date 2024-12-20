import { SnackbarProvider, useSnackbar } from "@/contexts/snackbar.context";
import { Snackbar } from "react-native-paper";
export default function GlobalSnackbar() {
  const { visible, message, hideSnackbar } = useSnackbar();

  return (
    <Snackbar
      visible={visible}
      onDismiss={hideSnackbar}
      action={{
        label: "Close",
        onPress: hideSnackbar,
      }}
    >
      {message}
    </Snackbar>
  );
}
