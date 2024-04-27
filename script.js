document.getElementById('medication').addEventListener('change', function() {
    const doseStrengthInput = document.getElementById('doseStrengthInput');
    const medication = document.getElementById('medication').value;

    if (medication === 'brompheniramine' || medication === 'Glyceryl Guaiacolate Syrup') {
        doseStrengthInput.style.display = 'block'; 
        const doseStrengthLabel = document.querySelector('label[for="doseStrength"]');
        const doseStrengthInputField = document.getElementById('doseStrength');

        if(medication === 'brompheniramine'){
            doseStrengthLabel.textContent = 'Dose Strength (mg/tablet):';
            doseStrengthInputField.placeholder = 'Enter dose strength in mg/tablet';
        } else if(medication === 'Glyceryl Guaiacolate Syrup'){
            doseStrengthLabel.textContent = 'Dose Rate (mg/kg):';
            doseStrengthInputField.placeholder = 'Enter dose rate in mg/kg';
        }

        doseStrengthInputField.required = true; 
    } else {
        doseStrengthInput.style.display = 'none'; 
        document.getElementById('doseStrength').removeAttribute('required'); 
    }
});

document.getElementById('medicineForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const medication = document.getElementById('medication').value;

    try {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            throw new Error('Please enter valid weight and height values.');
        }

        let dosage = '';
        let info = '';

        if (medication === 'paracetamol') {
            dosage = calculateDosageParacetamol(weight);
            if (medication === 'paracetamol') {
                dosage = calculateDosageParacetamol(weight);
                info = `<pre>Paracetamol เป็นยาที่ใช้ในการลดไข้และบรรเทาอาการปวด โดยมีข้อมูลเบื้องต้นและประโยชน์ดังนี้:
                ข้อมูลเบื้องต้น:
                -ชื่อทางการแพทย์: Paracetamol (หรือ Acetaminophen)
                -ประเภท: ยารักษาอาการปวดและลดไข้
                -รูปแบบการใช้: สามารถใช้เป็นยาเม็ด หรือยาน้ำ
                <pre>ประโยชน์ของ Paracetamol:
                1.ลดไข้: มีประสิทธิภาพในการลดไข้ที่เกิดจากโรคหรืออาการอื่น ๆ
                2.บรรเทาอาการปวด: ใช้บรรเทาอาการปวดต่าง ๆ เช่น ปวดหัว ปวดเมื่อย และอาการปวดอื่น ๆ
                <pre>ข้อควรระวังในการใช้:
                1.ประสงค์ใช้แน่นอน: ใช้ Paracetamol ตามคำแนะนำของแพทย์และต้องมีจุดประสงค์เฉพาะ ไม่ควรใช้เพื่อการแก้ปัญหายากหรือไม่จำเป็น
                2.ไม่ควรเกินขนาด: ควรใช้ขนาดของยาตามที่แพทย์แนะนำ ไม่ควรเกินขนาดหรือใช้ในระยะเวลานานเกินไป เพื่อป้องกันผลข้างเคียงไม่พึงประสงค์`;
            }
            
        } else if (medication === 'ibuprofen') {
            dosage = calculateDosageIbuprofen(weight);
            info = `<pre>Ibuprofen เป็นยาที่ใช้ในการบรรเทาอาการปวด ลดไข้ และลดการอักเสบ โดยมีข้อมูลเบื้องต้นและประโยชน์ดังนี้:
            ข้อมูลเบื้องต้น:
            -ชื่อทางการแพทย์: Ibuprofen
            -ประเภท: ยารักษาอาการปวดและลดไข้
            -รูปแบบการใช้: สามารถใช้เป็นยาเม็ด และยาน้ำ
            -วิธีใช้ทั่วไป: ดื่มน้ำหรือทานเม็ดตามคำสั่งของแพทย์
            <pre>ประโยชน์ของ Ibuprofen:
            1.บรรเทาอาการปวด: ใช้บรรเทาอาการปวดต่าง ๆ เช่น ปวดหัว ปวดกล้ามเนื้อ และอาการปวดอื่น ๆ
            2.ลดไข้: มีประสิทธิภาพในการลดไข้ที่เกิดจากโรคหรืออาการอื่น ๆ
            <pre>ข้อควรระวังในการใช้:
            1.ไม่ควรใช้ในบางกรณี: ห้ามใช้ Ibuprofen ในบางกรณี เช่น ผู้ที่แพ้ยา หรือมีปัญหาในระบบทางเลือด โปรดปรึกษาแพทย์ก่อนใช้
            2.ใช้ตามคำสั่งของแพทย์: ควรใช้ Ibuprofen ตามคำสั่งแพทย์หรือคำแนะนำบนบรรจุภัณฑ์ เพื่อป้องกันผลข้างเคียงไม่พึงประสงค์
            3.ระวังเมื่อใช้ร่วมกับยาอื่น: อาจมีปัญหาเกี่ยวกับการร่วมกับยาอื่น ๆ ดังนั้นควรแจ้งให้แพทย์ทราบเกี่ยวกับยาทุกชนิดที่กำลังใช้`;
        } else if (medication === 'brompheniramine') {
            const doseStrength = parseFloat(document.getElementById('doseStrength').value);
            dosage = calculateDosageBrompheniramine(weight, doseStrength);
            info = `<pre>Brompheniramine เป็นยาที่ใช้ในการบรรเทาอาการแพ้ทางเยื่อบุตา ไอ และความดันทางเลือกของชนิดแอนติฮิสแตมิน มีข้อมูลเบื้องต้นและประโยชน์ดังนี้:
            ข้อมูลเบื้องต้น:
            -ชื่อทางการแพทย์: Brompheniramine
            -ประเภท: ยารักษาอาการแพ้ทางเยื่อบุตา ไอ และความดันทางเลือกของชนิดแอนติฮิสแตมิน
            -รูปแบบการใช้: สามารถใช้เป็นยาเม็ด หรือยาน้ำ
            <pre>ประโยชน์ของ Brompheniramine:
            1.บรรเทาอาการแพ้ทางเยื่อบุตา: ใช้บรรเทาอาการต่าง ๆ เช่น ตาคล้ำ ตาอักเสบ และอาการแพ้ทางเยื่อบุตาอื่น ๆ
            2.บรรเทาอาการไอ: มีประสิทธิภาพในการบรรเทาอาการไอที่เกิดจากการติดเชื้อหรืออาการอื่น ๆ
            <pre>ข้อควรระวังในการใช้:
            1.ไม่ควรใช้ในบางกรณี: ห้ามใช้ Brompheniramine ในบางกรณี เช่น ผู้ที่มีโรคหัวใจ โรคไต เบาหวาน หรือใช้ยาอื่นที่มีส่วนผสมของแอนติฮิสตามิน 
            โปรดปรึกษาแพทย์ก่อนใช้
            2.ผลข้างเคียง: อาจเกิดผลข้างเคียงได้ เช่น ง่วง ปวดศีรษะ หรือความอึดอัดในท้อง หากมีอาการไม่พึงประสงค์ ควรแจ้งให้แพทย์ทราบ`;
        } else if(medication === 'Glyceryl Guaiacolate Syrup'){
            const doseStrength = parseFloat(document.getElementById('doseStrength').value);
            dosage = calculateDosageGlycerylGuaiacolateSyrup(weight, doseStrength);
            info = `<pre>Glyceryl Guaiacolate Syrup เป็นยาที่ใช้ในการบรรเทาอาการไอ โดยมีส่วนประกอบหลักคือ glyceryl guaiacolate มีข้อมูลเบื้องต้นและประโยชน์ดังนี้:
            ข้อมูลเบื้องต้น:
            -ชื่อทางการแพทย์: Glyceryl Guaiacolate Syrup
            -ประเภท: ยาบรรเทาอาการไอ
            -รูปแบบการใช้: เป็นยาน้ำ (syrup) ที่สามารถทานได้ง่าย
            <pre>ประโยชน์ของ Glyceryl Guaiacolate Syrup:
            1.บรรเทาอาการไอ: มีประสิทธิภาพในการบรรเทาอาการไอที่เกิดจากการติดเชื้อหรืออาการอื่น ๆ
            <pre>ข้อควรระวังในการใช้:
            1.ใช้ตามคำแนะนำของแพทย์: ควรใช้ Glyceryl Guaiacolate Syrup ตามคำแนะนำของแพทย์เท่านั้น เพื่อป้องกันผลข้างเคียงไม่พึงประสงค์
            2.ปรับขนาดให้เหมาะสม: ควรปรับขนาดของยาตามอายุและน้ำหนักของผู้ใช้ เพื่อให้ได้ผลลัพธ์ที่เหมาะสม
            3.ระวังการใช้ร่วมกับยาอื่น: อาจมีปัญหาเกี่ยวกับการร่วมกับยาอื่น ๆ ดังนั้นควรแจ้งให้แพทย์ทราบเกี่ยวกับยาทุกชนิดที่กำลังใช้`;
        }

        document.getElementById('result').textContent = `Recommended dosage: ${dosage}`;
        document.getElementById('content_Med').innerHTML = info.replace(/\n/g, '<br>');
        //document.getElementById('content_Med').textContent = `${info}`;
    } catch (error) {
        alert(error.message);
    }
});

function calculateDosageParacetamol(weight) {
    const minDosage = weight * 10;
    const maxDosage = weight * 15;
    return `${minDosage} - ${maxDosage} mg per day`;
}

function calculateDosageIbuprofen(weight) {
    const minDosage = weight * 5;
    const maxDosage = weight * 10;
    return `${minDosage} - ${maxDosage} mg per day`;
}

function calculateDosageBrompheniramine(weight, doseStrength) {
    const maxDosage = weight * doseStrength; 
    return `${maxDosage.toFixed(2)} mg per day`;
}

function calculateDosageGlycerylGuaiacolateSyrup(weight, doseStrength) {
    const maxDosage = weight * doseStrength; 
    return `${maxDosage.toFixed(2)} mg per day`;
}
