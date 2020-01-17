package com.gpower.common.reportexcel.excel;

import java.lang.reflect.Field;

/**
 */
class ExcelFiledInfo implements Comparable<ExcelFiledInfo> {
	private final Field field;
	private final String cellName;
	private final ExcelCellType type;
	private final String format;
	private final String el;
	private final int order;
	private final String[] mapping;

	public ExcelFiledInfo(Field field, ExcelField excelField, int order) {
		this.field = field;
		this.cellName = excelField.value();
		this.type = excelField.type();
		this.format = excelField.format();
		this.el = excelField.el();
		this.order = excelField.order() == 0 ? order : excelField.order();
		this.mapping = excelField.mapping();
	}

	@Override
	public int compareTo(ExcelFiledInfo o) {
		int x = this.getOrder();
		int y = o.getOrder();
		return (x < y) ? -1 : ((x == y) ? 0 : 1);
	}

	public Field getField() {
		return field;
	}

	public String getCellName() {
		return cellName;
	}

	public ExcelCellType getType() {
		return type;
	}

	public String getFormat() {
		return format;
	}

	public String getEl() {
		return el;
	}

	public int getOrder() {
		return order;
	}

	public String[] getMapping() {
		return mapping;
	}
}
