using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OverOut.Utils
{
    public class FindOutScheduleDates
    {
        public static List<DateTime> GetScheduleDatesList(int monthsLength, string day)
        {
            var weeks = monthsLength*4;
            var days = weeks*7;
            var currentDate = DateTime.Now;
            var dateList = new List<DateTime>();

            for (var i = 0; i < days; i++)
            {
                var futureDays = currentDate.AddDays(i+1);

                if (futureDays.DayOfWeek.ToString().ToLower() == day.ToLower())
                {
                    dateList.Add(futureDays);
                }
                
            }
            return dateList;
        } 
    }
}