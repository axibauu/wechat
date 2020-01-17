package com.gpower.common.reportexcel.excel;

import java.util.Date;

/**
 * Created by wenpu_Di on 2019/5/27.
 */
public class TestUser {

    private String id;

    @ExcelField("姓名")
    private String name;

    @ExcelField("联系电话")
    private String phone;

    @ExcelField(value = "年龄", type = ExcelCellType.NUMBER)
    private Integer age;

    // 带映射
    @ExcelField(value = "审核状态", mapping = {"0:已开通", "1:未开通", "2:禁用"})
    private String status;

    @ExcelField(value = "注册时间", type = ExcelCellType.DATE, format = "yyyy-MM-dd hh:mm")
    private Date createTime;

    @ExcelField(value = "单价", type = ExcelCellType.NUMBER)
    private double price;

    @ExcelField(value = "数量", type = ExcelCellType.NUMBER)
    private Integer size;

    @ExcelField(value = "是否xx", type = ExcelCellType.BOOL, format = "是:否")
    private boolean xx;

    @ExcelField(value = "总价", type = ExcelCellType.NUMBER, el = "#{price * size}")
    private double totalPrice;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public boolean isXx() {
        return xx;
    }

    public void setXx(boolean xx) {
        this.xx = xx;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public String toString() {
        return "TestUser{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", age=" + age +
                ", status=" + status +
                ", createTime=" + createTime +
                ", price=" + price +
                ", size=" + size +
                ", xx=" + xx +
                ", totalPrice=" + totalPrice +
                '}';
    }
}
