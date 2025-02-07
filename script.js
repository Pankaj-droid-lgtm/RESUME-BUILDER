document.getElementById('resume-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get values from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    const github = document.getElementById('github').value;
    const linkedin = document.getElementById('linkedin').value;
    const projects = document.getElementById('projects').value;
    const photoInput = document.getElementById('photo');
    const photoFile = photoInput.files[0];

    // Create a URL for the uploaded photo
    let photoURL = '';
    if (photoFile) {
        photoURL = URL.createObjectURL(photoFile);
    }

    // Generate the resume output
    const resumeOutput = `
        <div class="resume-header">
            <img src="${photoURL}" alt="Profile Photo">
            <h2>${name}</h2>
            <p>${email} | ${phone} | ${address}</p>
            <p><a href="${linkedin}" target="_blank">LinkedIn</a> | <a href="https://github.com/${github}" target="_blank">GitHub</a></p>
        </div>
        <h3>Experience</h3>
        <p>${experience}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Projects</h3>
        <p>${projects}</p>
    `;

    document.getElementById('resume-output').innerHTML = resumeOutput;
    document.getElementById('download-btn').style.display = 'block';
});

// Function to download the resume as a PDF
document.getElementById('download-btn').addEventListener('click', function() {
    const resumeOutput = document.getElementById('resume-output');

    html2canvas(resumeOutput).then(function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190; // Width of the image in PDF
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add new pages if the image height is greater than the page height
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save('resume.pdf');
    });
});
