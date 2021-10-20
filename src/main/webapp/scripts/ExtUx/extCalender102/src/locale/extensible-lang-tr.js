/*!
 * Extensible 1.0.2
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@Calendar102.akgun.com
 * http://Calendar102.akgun.com
 */
/*
 * Turkish (TR) locale
 * By M.Emre AYDIN
 */


Calendar102.akgun.Date.use24HourTime = false;

if(Calendar102.akgun.cal.CalendarView) {
    Ext.apply(Calendar102.akgun.cal.CalendarView.prototype, {
        startDay: 0,
        todayText: 'Bugün',
        defaultEventTitleText: '(Başlıksız)',
        ddCreateEventText: 'Şu zaman için randevu oluştur {0}',
        ddMoveEventText: 'Randevuyu şu zamana taşı {0}',
        ddResizeEventText: 'Randevuyu şu zamana güncelle {0}'
    });
}

if(Calendar102.akgun.cal.MonthView) {
    Ext.apply(Calendar102.akgun.cal.MonthView.prototype, {
        moreText: '+{0} more...', // deprecated
        getMoreText: function(numEvents){
            return '+{0} vb...';
        },
        detailsTitleDateFormat: 'F j'
    });
}

if(Calendar102.akgun.cal.CalendarPanel) {
    Ext.apply(Calendar102.akgun.cal.CalendarPanel.prototype, {
        todayText: 'Bugün',
        dayText: 'gün',
        weekText: 'Hafta',
        monthText: 'Ay',
        jumpToText: 'Şu zamana atla:',
        goText: 'Git',
        multiDayText: '{0} Gün', // deprecated
        multiWeekText: '{0} Hafta', // deprecated
        getMultiDayText: function(numDays){
            return '{0} Gün';
        },
        getMultiWeekText: function(numWeeks){
            return '{0} Hafta';
        }
    });
}

if(Calendar102.akgun.cal.EventEditWindow) {
    Ext.apply(Calendar102.akgun.cal.EventEditWindow.prototype, {
        width: 600,
        labelWidth: 65,
        titleTextAdd: 'Randevu Ekle',
        titleTextEdit: 'Randevuyu Düzenle',
        savingMessage: 'Değişiklikler kaydediliyor...',
        deletingMessage: 'Randevu siliniyor...',
        detailsLinkText: 'Randevu Detayı...',
        saveButtonText: 'Kaydet',
        deleteButtonText: 'Sil',
        cancelButtonText: 'Vazgeç',
        titleLabelText: 'Başlık',
        datesLabelText: 'Randevu Zamanı',
        calendarLabelText: 'Takvim'
    });
}

if(Calendar102.akgun.cal.EventEditForm) {
    Ext.apply(Calendar102.akgun.cal.EventEditForm.prototype, {
        labelWidth: 65,
        labelWidthRightCol: 65,
        title: 'Randevu Formu',
        titleTextAdd: 'Randevu Ekle',
        titleTextEdit: 'Randevuyu Düzenle',
        saveButtonText: 'Kaydet',
        deleteButtonText: 'Sil',
        cancelButtonText: 'Vazgeç',
        titleLabelText: 'Başlık',
        datesLabelText: 'Randevu Zamanı',
        reminderLabelText: 'Hatırlatıcı',
        notesLabelText: 'Notlar',
        locationLabelText: 'Randevu Yeri',
        webLinkLabelText: 'Web Linki',
        calendarLabelText: 'Takvim',
        repeatsLabelText: 'Tekrarlayacak'
    });
}

if(Calendar102.akgun.cal.DateRangeField) {
    Ext.apply(Calendar102.akgun.cal.DateRangeField.prototype, {
        toText: 'Kime',
        allDayText: 'Tüm gün'
    });
}

if(Calendar102.akgun.cal.CalendarCombo) {
    Ext.apply(Calendar102.akgun.cal.CalendarCombo.prototype, {
        fieldLabel: 'Takvim'
    });
}

if(Calendar102.akgun.cal.CalendarList) {
    Ext.apply(Calendar102.akgun.cal.CalendarList.prototype, {
        title: 'Takvimler'
    });
}

if(Calendar102.akgun.cal.CalendarListMenu) {
    Ext.apply(Calendar102.akgun.cal.CalendarListMenu.prototype, {
        displayOnlyThisCalendarText: 'Sadece bu takvimi göster'
    });
}

if(Calendar102.akgun.cal.RecurrenceCombo) {
    Ext.apply(Calendar102.akgun.cal.RecurrenceCombo.prototype, {
        fieldLabel: 'Tekrarlayacak',
        recurrenceText: {
            none: 'Tekrarlamayacak',
            daily: 'Günlük',
            weekly: 'Haftalık',
            monthly: 'Aylık',
            yearly: 'Yıllık'
        }
    });
}

if(Calendar102.akgun.cal.ReminderField) {
    Ext.apply(Calendar102.akgun.cal.ReminderField.prototype, {
        fieldLabel: 'Hatırlatıcı',
        noneText: '-',
        atStartTimeText: 'Randevu başladığında',
        getMinutesText: function(numMinutes){
            return numMinutes === 1 ? 'dakika' : 'dakika';
        },
        getHoursText: function(numHours){
            return numHours === 1 ? 'saat' : 'saat';
        },
        getDaysText: function(numDays){
            return numDays === 1 ? 'gün' : 'gün';
        },
        getWeeksText: function(numWeeks){
            return numWeeks === 1 ? 'hafta' : 'hafta';
        },
        reminderValueFormat: 'Randevu zamanına {0} {1} kaldı' // e.g. "2 hours before start"
    });
}

if(Calendar102.akgun.cal.DateRangeField) {
    Ext.apply(Calendar102.akgun.cal.DateRangeField.prototype, {
        dateFormat: 'n/j/Y'
    });
}

if(Calendar102.akgun.cal.EventContextMenu) {
    Ext.apply(Calendar102.akgun.cal.EventContextMenu.prototype, {
        editDetailsText: 'Randevu Detayı',
        deleteText: 'Sil',
        moveToText: 'Taşı...'
    });
}

if(Calendar102.akgun.cal.DropZone) {
    Ext.apply(Calendar102.akgun.cal.DropZone.prototype, {
        dateRangeFormat: '{0}-{1}',
        dateFormat: 'n/j'
    });
}

if(Calendar102.akgun.cal.DayViewDropZone) {
    Ext.apply(Calendar102.akgun.cal.DayViewDropZone.prototype, {
        dateRangeFormat: '{0}-{1}',
        dateFormat : 'n/j'
    });
}

if(Calendar102.akgun.cal.BoxLayoutTemplate) {
    Ext.apply(Calendar102.akgun.cal.BoxLayoutTemplate.prototype, {
        firstWeekDateFormat: 'D j',
        otherWeeksDateFormat: 'j',
        singleDayDateFormat: 'l, F j, Y',
        multiDayFirstDayFormat: 'M j, Y',
        multiDayMonthStartFormat: 'M j'
    });
}

if(Calendar102.akgun.cal.MonthViewTemplate) {
    Ext.apply(Calendar102.akgun.cal.MonthViewTemplate.prototype, {
        dayHeaderFormat: 'D',
        dayHeaderTitleFormat: 'l, F j, Y'
    });
}
