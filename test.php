<html>
<head>
<title>イベントビジュアル</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

</head>

<body>
<table border="1">
<?php

//db에 연결, 순서대로 호스트, 아이디, 비밀번호, 데이터베이스 명 입니다.

@$db = new mysqli('127.0.0.1', 'root', 'apmsetup', 'users');

if(mysqli_connect_errno())

{

echo '에러: 데이터베이스에 연결 할 수 없습니다.';

exit;

}
mysqli_query($db,"set names utf8");
$query = "select * from people";
$result = $db->query($query);
$num_results = $result->num_rows;
echo "<p>참가자: ".$num_results."</p>";
for($i=0; $i<$num_results; $i++)
{
$row = $result->fetch_assoc();
echo "<tr>";
echo "<td>".($i+1)."</td>";
echo "<td>".$row['name']."</td>";
echo "<td>".$row['twitter']."</td>";
echo "<td>".$row['work']."</td>";
echo "<td>".$row['genre']."</td>";
echo "<td>".$row['profile']."</td>";
echo "</tr>";
}
$result->free();
$db->close();
?>

</table>
</body>

</html>