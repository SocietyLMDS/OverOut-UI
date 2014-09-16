using System;
using System.Collections.Generic;
using OverOut.Models;

namespace OverOut.Utils
{
    public class FindOutScheduleDates
    {
        public static List<MultipleSchedule> GetScheduleDatesList(int monthsLength, DateTime startDateTime, DateTime endDateTime)
        {
            var dateList = new List<MultipleSchedule>();
            var firstSchedule = new MultipleSchedule {StartDateTime = startDateTime, EndDateTime = endDateTime};
            dateList.Add(firstSchedule);
            var weeks = monthsLength * 4;
            var days = weeks * 7;
            for (var j = 7; j < days; j+=7)
            {
                var startFutureDate = startDateTime.AddDays(j);
                var endFutureDate = endDateTime.AddDays(j);
                var multiSchedule = new MultipleSchedule { StartDateTime = startFutureDate, EndDateTime = endFutureDate };
                dateList.Add(multiSchedule);
            }

            return dateList;
        }
    }
}