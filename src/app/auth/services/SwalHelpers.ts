import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

/**
 * TODO: cambiar clase a utils de shared
 */
export class SwalHelpers {
  async showAlert(options: SweetAlertOptions): Promise<SweetAlertResult> {
    return await Swal.fire(options);
  }

  async showAlertEmptyOptions(title: string | HTMLElement | JQuery | undefined = "Please wait!", options?: SweetAlertOptions){
    if( options === undefined ){
      options = {
        didOpen: () => {
          Swal.showLoading();
        }
      };
    }
    this.showAlert({
      title,
      ...options,
    });
  }
  closeSwal() {
    Swal.close()
  }
}

