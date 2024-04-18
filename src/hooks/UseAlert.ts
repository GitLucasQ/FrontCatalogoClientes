import Swal from "sweetalert2";

const UseAlert = () => {
    const mostrarAlertaExitosa = async (
        mensaje: string = "Se grabaron los datos de forma correcta"
      ) => {
        await Swal.fire({
          title: "Operación exitosa",
          text: mensaje,
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      };
    
      const mostrarAlertaErronea = async (
        mensaje: string = "Sucedió un error al realizar la petición"
      ) => {
        await Swal.fire({
          title: "Error",
          text: mensaje,
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      };

      const mostrarAlertaConfirmacion = async (
        title: string = "¿Esta seguro de eliminar este registro?",
        showText: boolean = true
      ) => {
        const swal = await Swal.fire({
          title: title,
          text: showText ? "Atención: no es posible revertir esta acción." : "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#aaa",
          confirmButtonText: "Sí, deseo continuar",
          cancelButtonText: "No, cancelar",
          reverseButtons: true,
        });
        return swal.value;
      };
    
      const mostrarAlertaAdvertencia = async (text: string) => {
        const swal = await Swal.fire({
          title: "Advertencia",
          text: text,
          icon: "warning",
          confirmButtonColor: "#3085d6",
        });
        return swal.value;
      };

      return {
        mostrarAlertaExitosa,
        mostrarAlertaErronea,
        mostrarAlertaConfirmacion,
        mostrarAlertaAdvertencia
      }
}

export default UseAlert;