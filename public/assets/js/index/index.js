$(document).ready(function () {
  $(".btn-delete").on("click", function (e) {
    e.preventDefault();

    if (confirm("Seguro que quieres eliminar este pokemon?")) {
      const toastLiveExample = document.getElementById("liveToast");
      const toast = new bootstrap.Toast(toastLiveExample);
      toast.show();

      $(this).closest(".form-delete").submit();
    }
  });
});
