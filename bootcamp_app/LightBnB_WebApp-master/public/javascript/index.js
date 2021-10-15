$(document).ready(function () {
  getAllListings().then(function (json) {
    propertyListings.addProperties(json.properties);
    views_manager.show("listings");
    //Listen for click - when clicked retrieve the node's id value
    $btn = $(".reserve-button");
    $btn.on("click", function () {
      const idData = $(this).attr("id").substr(17);
      views_manager.show("newReservation", idData);
    });
  });
});
