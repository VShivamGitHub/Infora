
document.addEventListener('DOMContentLoaded', function(){
    const checkboxes = document.querySelectorAll('.item-select');
    checkboxes.forEach(function(checkbox) {
        const card = document.getElementById('card-' + checkbox.dataset.index);

        // Apply the correct animation on page load if already checked
        if (checkbox.checked) {
            card.classList.add('checked-card');
        }

        // Listen for changes on each checkbox
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                card.classList.remove('unchecked-card'); // Remove unchecked animation class
                card.classList.add('checked-card');  // Add checked animation class
            } else {
                card.classList.remove('checked-card');  // Remove checked animation class
                card.classList.add('unchecked-card');  // Add unchecked animation class
            }
        });
    });
});