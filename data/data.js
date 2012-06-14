var docListData =
	[
    {
        "name": "PLANT_OBJECT_API",
        "methods": [
            {
                "name": "Create_Object__",
                "type": "PROCEDURE",
                "tested": true,
                "description": "",
                "line": 7420,
                "signature": [
                    {
                        "name": "OBJID",
                        "direction": "OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "OBJECTVERSION",
                        "direction": "OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "ATTR",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "CLASS",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "STD_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    }
                ],
                "usage": "DECLARE\n\tobjid_ VARCHAR(20);\n\tobjversion_ VARCHAR(20);\n\tattr_ VARCHAR(2000);\n\nBEGIN\n\n\tattr_ := 'CLASS' || chr(31) || 'INSTRUMENT_FIELD' || chr(30)\n\t||       'STD_SQ' || chr(31) || '102' || chr(30)\n\t||       'PLT_SQ' || chr(31) || '202' || chr(30)\n\t||       'OBJECT_SQ' || chr(31) || IFSAPP.PLANT_OBJECT_SEQ.nextval || chr(30)\n\t||       'OBJECT_REVISION' || chr(31) || '1' || chr(30)\n\t||       'KEYA01' || chr(31) || 'HWHTESTSQL01' || chr(30);\n\n\tIFSAPP.PLANT_OBJECT_API.Create_Object__ (objid_, \nobjversion_, attr_, \n'INSTRUMENT_FIELD', \n102);\n\tCOMMIT;\nEND;"
            },
            {
                "name": "Modify_Object__",
                "type": "PROCEDURE",
                "tested": false,
                "description": "",
                "line": 7542,
                "signature": [
                    {
                        "name": "ATTR",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "OBJECT_VERSION",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "OBJ_ID",
                        "direction": "IN",
                        "type": "VARCHAR2",
                        "default": "NULL"
                    }
                ],
                "usage": "DECLARE\n\tobjversion_ VARCHAR(20);\n\tattr_ VARCHAR(2000);\n\nBEGIN\n\n\tattr_ := 'DENOM1' || chr(31) || 'TEST01' || chr(30);\n\n\tIFSAPP.PLANT_OBJECT_API.Modify_Object__ (attr_, objversion_, 202, 5473, '1');\n\tCOMMIT;\nEND;"
            },
            {
                "name": "Remove_Object",
                "type": "PROCEDURE",
                "tested": false,
                "line": 13652,
                "description": "Used for removing a PLANT_OBJECT (TESTED)\nShould also delete the TECHNICAL_* part of the object (NOT TESTED)",
                "signature": [
                    {
                        "name": "PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    }
                ],
                "usage": "BEGIN\n\tIFSAPP.PLANT_OBJECT_API.Remove_Object(202, 5470, '1');\n\tCOMMIT;\nEND;"
            },
            {
                "name": "Get_Key_Ref",
                "type": "FUNCTION",
                "line": 9048,
                "tested": true,
                "description": "Returns the key_ref for a PLANT_OBJECT.",
                "signature": [
                    {
                        "name": "PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    }
                ],
                "returns": "VARCHAR2",
                "usage": "SELECT IFSAPP.PLANT_OBJECT_API.Get_Key_Ref(202, 5462, 1) from dual;"
            },
            {
                "name": "Get_Std_Sq",
                "type": "FUNCTION",
                "line": 10498,
                "tested": true,
                "description": "",
                "signature": [
                    {
                        "name": "PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    }
                ],
                "returns": "VARCHAR2",
                "usage": "SELECT IFSAPP.PLANT_OBJECT_API.Get_Std_Sq(202, 5462, 1) from dual;"
            },
            {
                "name": "Get_Class",
                "type": "FUNCTION",
                "line": 10516,
                "tested": true,
                "description": "Returns the class for a PLANT_OBJECT",
                "signature": [
                    {
                        "name": "PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    }
                ],
                "returns": "VARCHAR2",
                "usage": "SELECT IFSAPP.PLANT_OBJECT_API.Get_Class(202, 5462, 1) from dual;"
            }
        ]
    },
    {
        "name": "PLANT_OBJECT_CONSIST_API",
        "methods": [
            {
                "name": "Create_Relation",
                "type": "PROCEDURE",
                "line": 1311,
                "tested": true,
                "description": "Used for creating realations among PLANT_OBJECTs.\nThe relation has to be predefined as a valid relation between the objects in question.\nValid relations are defined in PLANT_CLASS_RELATION_TAB, valid realation types are\ndefined in PLANT_OBJECT_RELATION_TYPE_TAB\n\nNothing happens if you try to create a relation twice.",
                "signature": [
                    {
                        "name": "SUB_PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "SUB_OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "SUB_OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "RELATION_TYPE",
                        "direction": "IN",
                        "type": "NUMBER"
                    }
                ],
                "usage": "BEGIN\n\tIFSAPP.plant_object_consist_api.Create_relation(202, 5462, 1, 202, 5464, 1, 6);\n\tCOMMIT;\nEND;"
            },
            {
                "name": "Modify_Relation",
                "type": "PROCEDURE",
                "line": 1472,
                "tested": false,
                "description": "",
                "signature": [
                    {
                        "name": "SUB_PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "SUB_OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "SUB_OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "RELATION_TYPE",
                        "direction": "IN",
                        "type": "NUMBER"
                    }
                ],
                "usage": ""
            },
            {
                "name": "Remove_Relation",
                "type": "PROCEDURE",
                "line": 1486,
                "tested": true,
                "description": "Used for removing a relation between two PLANT_OBJECTs.\nNothing happens if you try to remove a relation that does not exists.",
                "signature": [
                    {
                        "name": "SUB_PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "SUB_OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "SUB_OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "RELATION_TYPE",
                        "direction": "IN",
                        "type": "NUMBER"
                    }
                ],
                "usage": "BEGIN\n\tIFSAPP.plant_object_consist_api.Remove_Relation(202, 5462, 1, 202, 5464, 1, 6);\n\tCOMMIT;\nEND;"
            },
            {
                "name": "Exist",
                "type": "PROCEDURE",
                "line": 669,
                "tested": true,
                "description": "Used for checking if a relation exists.\nDoes nothing if the relation exist, calls Error_SYS.Record_Not_Exist if it does not.\nError starting at line 1 in command:\nEXECUTE IFSAPP.PLANT_OBJECT_CONSIST_API.Exist(201, 5462, 1, 202, 5464, 1, 6)\nError report:\nORA-20111: PlantObjectConsist.NOTEXIST2: The Plant Object Consist object does not exist.\nORA-06512: ved \"IFSAPP.ERROR_SYS\", line 145\nORA-06512: ved \"IFSAPP.PLANT_OBJECT_CONSIST_API\", line 680\nORA-06512: ved line 1",
                "signature": [
                    {
                        "name": "SUB_PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "SUB_OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "SUB_OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "RELATION_TYPE",
                        "direction": "IN",
                        "type": "NUMBER"
                    }
                ],
                "usage": "EXECUTE IFSAPP.PLANT_OBJECT_CONSIST_API.Exist(202, 5462, 1, 202, 5464, 1, 6);"
            }
        ]
    },
    {
        "name": "PLANT_OBJECT_UTIL_API",
        "methods": [
            {
                "name": "Change_Class",
                "type": "PROCEDURE",
                "line": 8690,
                "tested": false,
                "description": "",
                "signature": [
                    {
                        "name": "PLT_SQ",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "OBJECT_SQ",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "OBJECT_REVISION",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "NEW_CLASS",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    }
                ],
                "usage": ""
            },
            {
                "name": "Check_Key_Exist",
                "type": "FUNCTION",
                "line": 7805,
                "tested": false,
                "description": "",
                "signature": [
                    {
                        "name": "keya01",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "keya02",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "keya03",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "keya04",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "keya05",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "keya06",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "keya07",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "keya08",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "keya09",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "keya10",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "class",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "std_sq",
                        "direction": "IN",
                        "type": "NUMBER"
                    },
                    {
                        "name": "type",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "default_value",
                        "direction": "IN OUT",
                        "type": "VARCHAR2"
                    }
                ],
                "usage": ""
            }
        ]
    },
    {
        "name": "TECHNICAL_ATTRIB_ALPHANUM_API",
        "methods": [
            {
                "name": "Check_Exist",
                "line": 625,
                "type": "FUNCTION",
                "tested": false,
                "description": "",
                "signature": [
                    {
                        "name": "TECHNICAL_CLASS",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "ATTRIBUTE",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    }
                ],
                "returns": "VARCHAR2",
                "usage": ""
            }
        ]
    },
    {
        "name": "TECHNICAL_ATTRIB_NUMERIC_API",
        "methods": [
            {
                "name": "Get_Technical_Unit",
                "line": 635,
                "tested": false,
                "description": "",
                "signature": [
                    {
                        "name": "TECHNICAL_CLASS",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "ATTRIBUTE",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    }
                ],
                "returns": "VARCHAR2",
                "usage": ""
            }
        ]
    },
    {
        "name": "TECHNICAL_SPEC_ATTR3_API",
        "metods": [
            {
                "name": "Modify_Value_By_Lu_Key",
                "line": 415,
                "type": "PROCEDURE",
                "tested": false,
                "description": "",
                "signature": [
                    {
                        "name": "LUNAME",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "KEY_REF",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "ATTRIBUTE",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    },
                    {
                        "name": "VALUE",
                        "direction": "IN",
                        "type": "VARCHAR2"
                    }
                ],
                "usage": ""
            }
        ]
    }
];