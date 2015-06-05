$(document).ready(function() {
  $('.edit').click(function() {
    $(this).closest('tr').find('td').toggle();
  });
});
