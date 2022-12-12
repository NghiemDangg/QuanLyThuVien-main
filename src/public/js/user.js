function save() {
  const $iduser = $("#userid").val();
  const $fullName = $("#personName").val();
  const $phone = $("#phone").val();
  const $location = $("#Location").val();
  const $userName = $("#UserName").val();
  const $password = $("#password").val();
  //iduser
  if ($iduser === "") {
    const $error = $("#userid-error").html("*Id đọc giả không được để trống !");
  } else {
    const $error = $("#userid-error").html("");
  }
  //fullname
  if ($fullName === "") {
    const $error = $("#fullname-error").html("*Họ tên không được để trống !");
  } else if ($fullName.trim().length < 2) {
    $fullName = "";
    const $error = $("#fullname-error").html("*Họ tên từ 8 ký tự trở lên");
  } else if ($fullName.trim().length > 50) {
    $fullName = "";
    const $error = $("#fullname-error").html("*Họ tên ít hơn 50 ký tự");
  } else {
    const $error = $("#fullname-error").html("");
  }
  //phone
  if ($phone === "") {
    const $error = $("#phone-error").html("*Điện thoại không được để trống !");
  } else if ($phone.trim().length > 10) {
    $phone = "";
    const $error = $("#phone-error").html(
      "*Số Điện thoại không đúng định dạng !"
    );
  } else {
    const $error = $("#phone-error").html("");
  }
  //location
  if ($location === "") {
    const $error = $("#Location-error").html("*Địa chỉ không được để trống !");
  } else {
    const $error = $("#Location-error").html("");
  }
  //Username
  if ($userName === "") {
    const $error = $("#UserName-error").html("*Username không được để trống !");
  } else {
    const $error = $("#UserName-error").html("");
  }
  //password
  function password(pass) {
    return /^[A-Za-z]\w{7,14}$/.test(pass);
  }

  if ($password === "") {
    const $error = $("#password-error").html("*Mật khẩu không được để trống !");
  } 
  // else if (!password($password)) {
  //   $password = "";
  //   const $error = $("#password-error").html("*Mật khẩu chưa đủ mạnh");
  // }
   else {
    const $error = $("#password-error").html("");
  }

  if ($iduser && $fullName && $phone && $location && $userName && $password) {
    let users = [];
    users.push({
      iduser: $iduser,
      fullName: $fullName,
      phone: $phone,
      location: $location,
      userName: $userName,
      password: $password,
    });

    let tableContent = `<tr class="">
    <td scope="row">DG01</td>
    <td>Nguyễn Văn A</td>
    <td>0989888999</td>
    <td>Hà Nội</td>
    <td>
      <div class="option-item">
        <i class="bi bi-pencil-square edit"></i>
        <i class="bi bi-trash3 delete"></i>
      </div>
    </td>
  </tr>`

  users.forEach((user,index)=>{
    index++;
    tableContent += `
    <tr class="">
    <td scope="row">${users.iduser}</td>
    <td>${users.fullName}</td>
    <td>${users.phone}</td>
    <td>${users.location}</td>
    <td>
      <div class="option-item">
        <i class="bi bi-pencil-square edit"></i>
        <i class="bi bi-trash3 delete"></i>
      </div>
    </td>
  </tr>`
  })

  $("#user-list").html(tableContent)
  }
}
