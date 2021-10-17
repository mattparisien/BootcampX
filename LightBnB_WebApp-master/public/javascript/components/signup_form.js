$(() => {
  const $signUpForm = $(`
  <form id="sign-up-form" class="sign-up-form form-control">
        <p>Sign Up</p>

        <div class="sign-up-form__field-wrapper">
            <input class="form-control" type="text" name="name" placeholder="Username">
          </div>

        <div class="sign-up-form__field-wrapper">
          <input class="form-control" type="email" name="email" placeholder="Email">
        </div>
  
        <div class="sign-up-form__field-wrapper">
            <input class="form-control" type="password" name="password" placeholder="Password">
          </div>
  
        <div class="sign-up-form__field-wrapper">
            <button>Sign Up</button>
            <a id="sign-up-form__cancel" href="#">Cancel</a>
        </div>
      </form>
  `);
  window.$signUpForm = $signUpForm;

  $signUpForm.on("submit", function (event) {
    event.preventDefault();

    const data = $(this).serialize();
    signUp(data)
      .then(getMyDetails)
      .then(json => {
        header.update(json.user);
        views_manager.show("listings");
      });
  });

  $("body").on("click", "#sign-up-form__cancel", function () {
    views_manager.show("listings");
    return false;
  });
});
