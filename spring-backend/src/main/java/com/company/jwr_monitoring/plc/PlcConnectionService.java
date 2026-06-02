package com.company.jwr_monitoring.plc;

import org.apache.plc4x.java.api.PlcConnection;
import org.apache.plc4x.java.api.PlcDriverManager;
import org.springframework.stereotype.Service;

@Service
public class PlcConnectionService {

    public PlcConnection getConnection(String ip, Integer port)
            throws Exception {

        String connectionString = "modbus-tcp://" + ip + ":" + port;

        return PlcDriverManager
                .getDefault()
                .getConnectionManager()
                .getConnection(connectionString);
    }
}