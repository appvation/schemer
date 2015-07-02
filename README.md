# schemer

## Quickstart

1. `npm install -g parse-schemer`
2. `schemer output -i [PARSE-APPLICATION-ID] -k [PARSE-MASTER-KEY] [CLASSNAME]`


## Commands:

    add [options] [fieldName]     add a field to a class
    delete [options] [fieldName]  delete a field from a class
    output [options] [className]  output class schema

### Add

Usage: add [options] [fieldName]

add a field to a class

Options:

    -h, --help                           output usage information
    -c, --className [className]          Target class
    -t, --fieldType [fieldType]          Field Type
    -e, --environment [environment]      Environment
    -i, --applicationId [applicationId]  application ID
    -k, --masterKey [masterKey]          master key
    
    
### Delete

Usage: delete [options] [fieldName]

delete a field from a class

Options:

    -h, --help                           output usage information
    -c, --className [className]          Target class
    -e, --environment [environment]      Environment
    -i, --applicationId [applicationId]  application ID
    -k, --masterKey [masterKey]          master key
