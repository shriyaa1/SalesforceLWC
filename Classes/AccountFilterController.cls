public with sharing class AccountFilterController {
 @AuraEnabled
    public static List<Account> getAccounts(String accIndustry, String accName ){
    String query = 'Select Id, Name, AnnualRevenue, Industry,Website, Phone from Account ';
    String accNameFilter = '\'%' + String.escapeSingleQuotes(accName) + '%\'';
    if(String.isNotBlank(accIndustry) && String.isNotBlank(accName))
    {
    query += 'Where Industry = ' + '\'' + String.escapeSingleQuotes(accIndustry) + '\'' + ' AND Name like ' +accNameFilter;
    }
    else if(String.isNotBlank(accIndustry) && String.isBlank(accName)){
    query += 'Where Industry = ' + '\'' + String.escapeSingleQuotes(accIndustry) + '\'' ;
    }
    else if(String.isBlank(accIndustry) && String.isNotBlank(accName)){
    query += 'Where Name like ' + accNameFilter ;
    }
    List<Account> fetchAccounts = new List<Account>();
    fetchAccounts = Database.query(query);
    return fetchAccounts;
    }
    }