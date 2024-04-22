<>
      <div className="App">
        <div className="Box">
          <div className="container-wrap">
            <h1 className="heading">บิลรายการอาหาร</h1>
            <p className="status-open">สถานะเปิดปิด</p>
          </div>
          <div className="center">
            <div className="T-div">
              <div>
                <table>
                  <tr>
                    <th>ลำดับ</th>
                    <th>รายการ</th>
                    <th>ราคา</th>
                    <th>ส่วนลดราคา</th>
                    <th>สรุป</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>กระเพรา</td>
                    <td>$100</td>
                    <td>$10</td>
                    <td>$90</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>ข้าวมันไก่</td>
                    <td>$80</td>
                    <td>$10</td>
                    <td>$70</td>
                  </tr>
                  <tr>
                    <td id="t-sum" colSpan={4}>สรุปรายการ</td>
                    <td>160 บาท </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>