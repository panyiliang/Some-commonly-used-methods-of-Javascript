/** 生日年龄转换
 * 
 * 规则：
 * 年龄大于三岁输出 xx岁
 * 年龄超过6个月小于3岁 输出 x岁xx月
 * 年龄大于3天小于6个月 输出 x月xx天
 * 年龄小于3天 显示 xx小时
 * 
 * 注意 默认生日当天0点计算小时数
 * 
 * @param {String} date 参数格式为"YYYY-MM-DD"的字符串
 * 
 * @returns {String} 
 */
const birthAgeTransform = (date) => {
    let dateArr = date.split("-");
    let bYear = dateArr[0];
    let bMonth = dateArr[1];
    let bDay = dateArr[2];

    let d = new Date();
    let nowYear = d.getFullYear();
    let nowMonth = d.getMonth() + 1;
    let nowDay = d.getDate();
    let nowHours = d.getHours();

    let years = nowYear - bYear || -1;
    let months = 0;
    let days = 0;
    let hours = nowHours || 0;
    days = nowDay - bDay;
    months = nowMonth - bMonth;
    years = nowYear - bYear;

    if (days >= 0) {
        if (months < 0) {
            months += 12
            years--;
        }
    } else {
        let queryDays = getMonthDays(nowYear, nowMonth - 1);
        days += queryDays;
        months--;
        if (months < 0) {
            years--;
            months += 12;
        }
    }
    if (years < 0) {
        return "日期超前，请重新选择日期"
    }
    if (years >= 3) {
        return years + "岁"
    } else if ((months >= 6 && years == 0) || years > 0) {
        if (years == 0) {
            return months + "月"
        } else {
            return years + "岁" + months + "月"
        }
    } else if ((months < 6 && months > 0) || (months == 0 && days >= 3)) {
        if (months == 0) {
            return days + "天"
        } else {
            return months + "月" + days + "天"
        }
    } else if (days < 3) {
        hours += days * 24;
        return hours + "小时"
    }
}

/**获取某年某月的天数
 * 
 * @param {Int} year 目标年份 YYYY
 * @param {Int} month 目标月份 M
 */
const getMonthDays = (year, month) => {
    let thisDate = new Date(year, month, 0);
    return thisDate.getDate();
}